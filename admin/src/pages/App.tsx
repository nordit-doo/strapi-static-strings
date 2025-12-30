import { Page } from '@strapi/strapi/admin';
import { Route, Routes } from 'react-router-dom';

import { darkTheme, DesignSystemProvider } from '@strapi/design-system';

import { NamespacesPage } from './NamespacesPage';
import { ProjectsPage } from './ProjectsPage';
import { TranslationsPage } from './TranslationsPage';
import { ProjectTranslationsPage } from './ProjectTranslationsPage';

const App = () => {
  return (
    <DesignSystemProvider locale="en-GB" theme={darkTheme}>
      <Routes>
        <Route index path="/" element={<ProjectsPage />} />
        <Route index path="/projects/:projectId" element={<NamespacesPage />} />
        <Route
          index
          path="/projects/:projectId/translations"
          element={<ProjectTranslationsPage />}
        />
        <Route
          index
          path="/projects/:projectId/namespaces/:namespaceId"
          element={<TranslationsPage />}
        />
        <Route path="*" element={<Page.Error />} />
      </Routes>
    </DesignSystemProvider>
  );
};

export default App;
