export default async (policyContext, config, { strapi }) => {
  strapi.log.info('========================================');
  strapi.log.info('[has-permissions] POLICY CALLED!!!');
  strapi.log.info('========================================');

  const { action } = config;

  // Log context details - first check what we have
  const ctxKeys = Object.keys(policyContext);
  strapi.log.info('[has-permissions] Context keys array:', ctxKeys);
  strapi.log.info('[has-permissions] Context keys length:', ctxKeys.length);

  // Try to access each key individually
  for (const key of ctxKeys) {
    if (key === 'headers' || key === 'header' || key === 'state' || key === 'request') {
      strapi.log.info(`[has-permissions] ${key}:`, typeof policyContext[key]);
    }
  }

  // When using auth: false, manually authenticate the user from JWT token
  let adminUser = policyContext.state?.user || policyContext.state?.admin;

  // If not in state, try to get JWT token and verify it
  if (!adminUser) {
    try {
      strapi.log.info('[has-permissions] Starting JWT verification...');

      // Get JWT token from Authorization header
      const authHeader =
        policyContext.headers?.authorization || policyContext.header?.authorization;
      strapi.log.info('[has-permissions] Auth header:', authHeader ? 'Present' : 'Missing');

      let token = null;
      if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.replace('Bearer ', '');
        strapi.log.info('[has-permissions] Token extracted from Authorization header');
      }

      strapi.log.info(
        '[has-permissions] Token found:',
        token ? 'Yes (length: ' + token.length + ')' : 'No'
      );

      if (token) {
        // Use Strapi's token service to verify JWT
        const tokenService = strapi.service('admin::token');
        strapi.log.info('[has-permissions] Token service available:', tokenService ? 'Yes' : 'No');

        if (tokenService && tokenService.decodeJwtToken) {
          const payload = await tokenService.decodeJwtToken(token);
          strapi.log.info('[has-permissions] Decoded payload:', JSON.stringify(payload));

          if (payload?.id) {
            // Load the user with roles
            adminUser = await strapi.db.query('admin::user').findOne({
              where: { id: payload.id },
              populate: ['roles'],
            });
            strapi.log.info(
              '[has-permissions] Loaded user from JWT:',
              adminUser ? 'Success (ID: ' + adminUser.id + ')' : 'Failed'
            );
          } else {
            strapi.log.warn('[has-permissions] No user ID in payload');
          }
        } else {
          strapi.log.warn('[has-permissions] Token service or decodeJwtToken method not available');
        }
      }
    } catch (error) {
      strapi.log.error(
        '[has-permissions] JWT verification error:',
        error?.message || String(error)
      );
      strapi.log.error('[has-permissions] Error stack:', error?.stack || 'No stack trace');
    }
  }

  strapi.log.info('[has-permissions] Checking permission for action:', action);
  strapi.log.info('[has-permissions] Admin user:', adminUser ? 'Found' : 'Not found');

  if (!adminUser) {
    strapi.log.warn('[has-permissions] No admin user found');
    return false;
  }

  const { id: userId, roles } = adminUser;
  strapi.log.info('[has-permissions] User ID:', userId);
  strapi.log.info(
    '[has-permissions] User roles:',
    roles?.map((r: any) => r.code || r.name)
  );

  // Super Admin has all permissions
  const isSuperAdmin = roles?.some((role: any) => role.code === 'strapi-super-admin');
  if (isSuperAdmin) {
    strapi.log.info('[has-permissions] User is Super Admin - access granted');
    return true;
  }

  // Check if user has the specific permission
  try {
    const permissions = await strapi.admin.services.permission.engine.checkMany(userId, [
      { action },
    ]);

    strapi.log.info('[has-permissions] Permission check result:', permissions);

    if (permissions && permissions[0]) {
      strapi.log.info('[has-permissions] Access granted');
      return true;
    }
  } catch (error) {
    strapi.log.error('[has-permissions] Permission check error:', error);
  }

  strapi.log.warn('[has-permissions] Access denied');
  return false;
};
