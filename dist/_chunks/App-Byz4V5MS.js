"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const admin = require("@strapi/strapi/admin");
const reactRouterDom = require("react-router-dom");
const designSystem = require("@strapi/design-system");
const icons = require("@strapi/icons");
const react = require("react");
const index = require("./index-CXwYRK2-.js");
const { get: get$9, post: post$3, put: put$2, del: del$5 } = admin.getFetchClient();
const createNamespace = async ({
  projectId,
  name,
  description
}) => {
  return post$3(`/${index.PLUGIN_ID}/api/projects/${projectId}/namespaces`, { name, description }).then(
    (res) => res.data
  );
};
const updateNamespace = async ({
  projectId,
  id,
  name,
  description
}) => {
  return put$2(`/${index.PLUGIN_ID}/api/projects/${projectId}/namespaces/${id}`, {
    name,
    description
  }).then((res) => res.data);
};
const deleteNamespace$1 = async (id) => {
  return del$5(`/${index.PLUGIN_ID}/api/projects/${id}/namespaces/${id}`).then((res) => res.data);
};
const useHook$8 = ({ projectId, ref, refetch }) => {
  const [currentNamespace, setCurrentNamespace] = react.useState(null);
  const [description, setDescription] = react.useState("");
  const [isLoadingDelete, setIsLoadingDelete] = react.useState(false);
  const [isLoadingSave, setIsLoadingSave] = react.useState(false);
  const [isOpen, setIsOpen] = react.useState(false);
  const [name, setName] = react.useState("");
  const handleClose = () => {
    setIsOpen(false);
  };
  const handleDelete = async () => {
    if (currentNamespace) {
      setIsLoadingDelete(true);
      await deleteNamespace$1(currentNamespace.id);
      setIsLoadingDelete(false);
    }
    handleClose();
    refetch();
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleOpenChange = (open) => {
    setIsOpen(open);
  };
  const handleOpenModal = (data) => {
    setIsOpen(true);
    setCurrentNamespace(data || null);
    if (data) {
      setName(data.name);
      setDescription(data.description || "");
    } else {
      setName("");
      setDescription("");
    }
  };
  const handleSave = async () => {
    setIsLoadingSave(true);
    try {
      if (currentNamespace) {
        await updateNamespace({ id: currentNamespace.id, description, name, projectId });
      } else {
        await createNamespace({ projectId, name, description });
      }
      handleClose();
      refetch();
    } catch (error) {
      console.error("Error saving namespace:", error);
    }
    setIsLoadingSave(false);
  };
  react.useImperativeHandle(ref, () => ({
    open: handleOpenModal
  }));
  return {
    currentNamespace,
    description,
    handleClose,
    handleDelete,
    handleDescriptionChange,
    handleNameChange,
    handleOpenChange,
    handleSave,
    isLoadingDelete,
    isLoadingSave,
    isOpen,
    name
  };
};
const NamespaceCreateEditModal = react.forwardRef(({ projectId, refetch }, ref) => {
  const {
    currentNamespace,
    isLoadingDelete,
    isLoadingSave,
    isOpen,
    name,
    description,
    handleClose,
    handleDelete,
    handleDescriptionChange,
    handleNameChange,
    handleOpenChange,
    handleSave
  } = useHook$8({ projectId, ref, refetch });
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Root, { open: isOpen, onOpenChange: handleOpenChange, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Modal.Content, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Header, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Title, { children: "Create namespace" }) }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Body, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { flex: "1", direction: "column", gap: "2rem", children: [
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Field.Root, { flex: "1", required: true, width: "100%", children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: "Name" }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Input, { value: name, onChange: handleNameChange })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Field.Root, { flex: "1", width: "100%", children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: "Description" }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Textarea, { value: description, onChange: handleDescriptionChange })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Modal.Footer, { children: [
      !!currentNamespace && /* @__PURE__ */ jsxRuntime.jsx(
        designSystem.Button,
        {
          color: "white",
          gap: "0",
          loading: isLoadingDelete,
          variant: "secondary",
          onClick: handleDelete,
          startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.Trash, { color: "white" })
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: "1rem", children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { onClick: handleClose, variant: "tertiary", children: "Cancel" }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { loading: isLoadingSave, onClick: handleSave, children: "Save" })
      ] })
    ] })
  ] }) });
});
const { get: get$8, del: del$4 } = admin.getFetchClient();
const getNamespaces$1 = async ({
  page,
  projectId,
  search
}) => {
  const searchParam = search ? `&search=${encodeURIComponent(search)}` : "";
  return get$8(
    `/${index.PLUGIN_ID}/api/projects/${projectId}/namespaces/missing-translations?page=${page}${searchParam}`
  ).then((res) => res.data);
};
const deleteNamespace = async ({
  namespaceId,
  projectId
}) => {
  try {
    const response = await del$4(`/${index.PLUGIN_ID}/api/projects/${projectId}/namespaces/${namespaceId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
const useHook$7 = () => {
  const { projectId } = reactRouterDom.useParams();
  const [params, setParams] = reactRouterDom.useSearchParams();
  const confirmDeleteModalRef = react.useRef(null);
  const namespaceCreatedEditModalRef = react.useRef(null);
  const [isPending, setIsPending] = react.useState(true);
  const [namespaces, setNamespaces] = react.useState(null);
  const [selectedDeleteNamespace, setSelectedDeleteNamespace] = react.useState(null);
  const [searchQuery, setSearchQuery] = react.useState("");
  const handleEditNamespace = (namespace) => () => {
    namespaceCreatedEditModalRef.current?.open(namespace);
  };
  const handleToggleDeleteNamespace = (namespace) => async () => {
    if (namespace) {
      setSelectedDeleteNamespace(namespace);
      confirmDeleteModalRef.current?.open(namespace);
    } else {
      setSelectedDeleteNamespace(null);
    }
  };
  const handleDeleteConfirm = async () => {
    if (projectId && selectedDeleteNamespace?.id) {
      try {
        await deleteNamespace({
          namespaceId: Number(selectedDeleteNamespace.id),
          projectId: Number(projectId)
        });
        handleRefetch({ page: Number(params.get("page")) || 1, search: searchQuery });
        return true;
      } catch (error) {
        console.error(error);
      }
    }
    return false;
  };
  const handleNamespaceCreate = () => {
    namespaceCreatedEditModalRef.current?.open();
  };
  const handlePagePress = (page) => {
    setParams({ page: String(page) });
    handleRefetch({ page, search: searchQuery });
  };
  const handleSearchChange = (value) => {
    setSearchQuery(value);
    setParams({ page: "1" });
    handleRefetch({ page: 1, search: value });
  };
  const handleRefetch = async ({ page, search } = {
    page: Number(params.get("page")) || 1,
    search: ""
  }) => {
    const currentPage = page || 1;
    const searchTerm = search !== void 0 ? search : searchQuery;
    if (projectId) {
      setIsPending(true);
      const data = await getNamespaces$1({ page: currentPage, projectId, search: searchTerm });
      setNamespaces(data);
      setIsPending(false);
    }
  };
  react.useEffect(() => {
    if (projectId) {
      const page = Number(params.get("page")) || 1;
      handleRefetch({ page, search: "" });
    }
  }, [projectId]);
  return {
    confirmDeleteModalRef,
    handleDeleteConfirm,
    handleEditNamespace,
    handleNamespaceCreate,
    handlePagePress,
    handleRefetch,
    handleSearchChange,
    handleToggleDeleteNamespace,
    isPending,
    namespaces,
    namespaceCreatedEditModalRef,
    projectId,
    searchQuery,
    selectedDeleteNamespace
  };
};
const Pagination = ({
  pagination: paginationProp,
  onPagePress
}) => {
  const pagination = react.useMemo(() => {
    if (!paginationProp) {
      return null;
    }
    return {
      page: paginationProp.page || 1,
      pages: Array.from({ length: paginationProp.pageCount }).map((_, i) => i),
      split: paginationProp.pageCount > 5
    };
  }, [paginationProp]);
  const handlePagePress = (page) => () => {
    onPagePress(page);
  };
  if (!pagination || pagination.pages.length === 1) {
    return /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, {});
  }
  if (pagination.split)
    return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Pagination, { activePage: pagination.page, pageCount: pagination.pages.length, children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        designSystem.PreviousLink,
        {
          disabled: pagination.page === 1,
          onClick: handlePagePress(pagination.page - 1),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsxs(
        designSystem.PageLink,
        {
          number: pagination.page <= pagination.pages.length - 4 ? pagination.page : pagination.pages.length - 3,
          onClick: handlePagePress(
            pagination.page <= pagination.pages.length - 4 ? pagination.page : pagination.pages.length - 3
          ),
          children: [
            "Go to",
            " ",
            pagination.page <= pagination.pages.length - 4 ? pagination.page : pagination.pages.length - 3
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsxs(
        designSystem.PageLink,
        {
          number: pagination.page <= pagination.pages.length - 4 ? pagination.page + 1 : pagination.pages.length - 2,
          onClick: handlePagePress(
            pagination.page <= pagination.pages.length - 4 ? pagination.page + 1 : pagination.pages.length - 2
          ),
          children: [
            "Go to",
            " ",
            pagination.page <= pagination.pages.length - 4 ? pagination.page + 1 : pagination.pages.length - 2
          ]
        }
      ),
      pagination.page <= pagination.pages.length - 4 && /* @__PURE__ */ jsxRuntime.jsx(designSystem.Dots, { children: `And ${pagination.pages.length - 4} other links` }),
      /* @__PURE__ */ jsxRuntime.jsxs(
        designSystem.PageLink,
        {
          number: pagination.pages.length - 1,
          onClick: handlePagePress(pagination.pages.length - 1),
          children: [
            "Go to ",
            pagination.pages.length
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsxs(
        designSystem.PageLink,
        {
          number: pagination.pages.length,
          onClick: handlePagePress(pagination.pages.length),
          children: [
            "Go to ",
            pagination.pages.length
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.NextLink, { onClick: handlePagePress(pagination.page + 1), children: "Next page" })
    ] });
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Pagination, { activePage: pagination.page, pageCount: pagination.pages.length, children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.PreviousLink,
      {
        tag: "div",
        disabled: pagination.page - 1 <= 0,
        onClick: handlePagePress(pagination.page - 1),
        children: "Previous"
      }
    ),
    pagination.pages.map((page) => /* @__PURE__ */ jsxRuntime.jsxs(designSystem.PageLink, { tag: "a", number: page + 1, onClick: handlePagePress(page + 1), children: [
      "Go to ",
      page + 1
    ] }, page)),
    /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.NextLink,
      {
        tag: "div",
        disabled: pagination.page + 1 > pagination.pages.length,
        onClick: handlePagePress(pagination.page + 1),
        children: "Next page"
      }
    )
  ] });
};
const useHook$6 = ({ onCancel, onConfirm, ref }) => {
  const [isOpen, setIsOpen] = react.useState(false);
  const [isLoadingConfirm, setIsLoadingConfirm] = react.useState(false);
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
    if (onCancel) {
      onCancel();
    }
  };
  const handleConfirm = async () => {
    setIsLoadingConfirm(true);
    const res = await onConfirm();
    setIsLoadingConfirm(false);
    if (res) {
      setIsOpen(false);
    }
  };
  react.useImperativeHandle(ref, () => ({
    open: handleOpen
  }));
  return {
    isOpen,
    isLoadingConfirm,
    handleOpen,
    handleClose,
    handleConfirm
  };
};
const ConfirmModal = react.forwardRef(
  ({ onCancel, onConfirm, text, title }, ref) => {
    const { handleClose, handleConfirm, isOpen, isLoadingConfirm } = useHook$6({
      onCancel,
      onConfirm,
      ref
    });
    return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Root, { open: isOpen, onOpenChange: handleClose, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Modal.Content, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Header, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Title, { children: title }) }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Body, { style: { paddingLeft: "2rem", paddingRight: "1rem" }, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { children: text }) }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Footer, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { justifyContent: "space-between", alignItems: "center", width: "100%", children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { flex: "1" }),
        /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: "1rem", children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { onClick: handleClose, variant: "tertiary", children: "Cancel" }),
          /* @__PURE__ */ jsxRuntime.jsx(
            designSystem.Button,
            {
              color: "white",
              loading: isLoadingConfirm,
              onClick: handleConfirm,
              startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.Trash, { color: "white" }),
              variant: "danger",
              style: { color: "white" },
              children: "Confirm"
            }
          )
        ] })
      ] }) })
    ] }) });
  }
);
const Namespaces = () => {
  const {
    confirmDeleteModalRef,
    handleDeleteConfirm,
    handleEditNamespace,
    handleNamespaceCreate,
    handlePagePress,
    handleRefetch,
    handleSearchChange,
    handleToggleDeleteNamespace,
    isPending,
    namespaces,
    namespaceCreatedEditModalRef,
    projectId,
    searchQuery,
    selectedDeleteNamespace
  } = useHook$7();
  const renderLoader = () => {
    if (isPending && !namespaces?.items.length) {
      return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Loader, {}) });
    }
    return /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, {});
  };
  const renderEmptyState = () => {
    if (!isPending && !namespaces?.items.length) {
      return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { background: "neutral100", children: /* @__PURE__ */ jsxRuntime.jsx(
        designSystem.EmptyStateLayout,
        {
          content: "You don't have any namespaces yet.",
          action: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { onClick: handleNamespaceCreate, startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.Plus, {}), variant: "secondary", children: "Create your first namespace" })
        }
      ) });
    }
    return /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, {});
  };
  const renderContent = () => {
    if (!isPending && !namespaces?.items.length) {
      return /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, {});
    }
    return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
      !!namespaces?.items?.length && /* @__PURE__ */ jsxRuntime.jsx(
        designSystem.Button,
        {
          marginBottom: "1rem",
          onClick: handleNamespaceCreate,
          startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.Plus, {}),
          variant: "secondary",
          children: "Add namespace"
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Box, { paddingTop: "1rem", paddingBottom: "1rem", children: [
        /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Table, { colCount: 3, rowCount: namespaces?.items?.length || 0, children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Thead, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Tr, { style: { width: "280px" }, children: [
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", children: "Namespace" }) }),
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", children: "Description" }) }),
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { style: { width: "120px" }, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", children: "Actions" }) })
          ] }) }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Tbody, { children: namespaces?.items?.map((namespace) => /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Tr, { children: [
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { style: { width: "280px" }, children: /* @__PURE__ */ jsxRuntime.jsx(
              designSystem.Link,
              {
                href: `/admin/plugins/${index.PLUGIN_ID}/projects/${projectId}/namespaces/${namespace.id}`,
                children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: 2, paddingTop: "15px", children: [
                  /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { fontWeight: "bold", variant: "omega", style: { color: "white" }, children: namespace.name }),
                  !!namespace.missingTranslationsCount && /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Badge, { backgroundColor: "red", style: { padding: "2px 6px" }, children: [
                    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { textColor: "white", fontSize: "9px", children: "Missing" }),
                    /* @__PURE__ */ jsxRuntime.jsx(
                      designSystem.Typography,
                      {
                        marginLeft: "4px",
                        fontWeight: "bold",
                        textColor: "white",
                        fontSize: "10px",
                        children: namespace.missingTranslationsCount
                      }
                    )
                  ] })
                ] })
              }
            ) }),
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "omega", children: namespace.description }) }),
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { style: { width: "120px" }, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: "0.5rem", justifyContent: "flex-end", children: [
              /* @__PURE__ */ jsxRuntime.jsx(
                designSystem.Button,
                {
                  gap: "0",
                  onClick: handleEditNamespace(namespace),
                  variant: "secondary",
                  startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.Pencil, {})
                }
              ),
              /* @__PURE__ */ jsxRuntime.jsx(
                designSystem.Button,
                {
                  gap: "0",
                  onClick: handleToggleDeleteNamespace(namespace),
                  startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.Trash, { color: "white" }),
                  variant: "danger"
                }
              )
            ] }) })
          ] }, namespace.id)) })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { justifyContent: "space-between", paddingTop: "1rem", children: namespaces?.pagination && /* @__PURE__ */ jsxRuntime.jsx(Pagination, { pagination: namespaces?.pagination, onPagePress: handlePagePress }) })
      ] })
    ] });
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { marginBottom: "2rem", width: "100%", children: /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.TextInput,
      {
        name: "search",
        placeholder: "Search namespaces by name or description...",
        value: searchQuery,
        onChange: (e) => handleSearchChange(e.target.value)
      }
    ) }),
    renderContent(),
    renderEmptyState(),
    renderLoader(),
    /* @__PURE__ */ jsxRuntime.jsx(
      NamespaceCreateEditModal,
      {
        ref: namespaceCreatedEditModalRef,
        projectId,
        refetch: handleRefetch
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(
      ConfirmModal,
      {
        ref: confirmDeleteModalRef,
        onCancel: handleToggleDeleteNamespace(),
        onConfirm: handleDeleteConfirm,
        text: `Are you sure you want to delete "${selectedDeleteNamespace?.name}"? This action cannot be undone.`,
        title: "Delete namespace"
      }
    )
  ] });
};
const NamespacesPage = () => /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Main, { padding: "2rem", children: [
  /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Box, { paddingBottom: "1rem", children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { paddingBottom: "0.5rem", gap: "1rem", children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "alpha", children: "Static translations" }) }),
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Breadcrumbs, { label: "Folder navigatation", children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.CrumbLink, { href: `/admin/plugins/${index.PLUGIN_ID}`, children: "Projects" }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Crumb, { isCurrent: true, children: "Namespaces" })
    ] })
  ] }),
  /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { padding: "1rem", children: /* @__PURE__ */ jsxRuntime.jsx(Namespaces, {}) })
] });
const { get: get$7, post: post$2 } = admin.getFetchClient();
const getApiKey = async () => {
  return get$7(`/${index.PLUGIN_ID}/api/settings/api-key`).then((res) => res.data);
};
const regenerateApiKey = async () => {
  const res = await post$2(`/${index.PLUGIN_ID}/api/settings/api-key/regenerate`);
  return res.data;
};
const useHook$5 = () => {
  const { toggleNotification } = admin.useNotification();
  const [isOpen, setIsOpen] = react.useState(false);
  const [apiKey, setApiKey] = react.useState(null);
  const [isLoading, setIsLoading] = react.useState(false);
  const handleFetchApiKey = async () => {
    setIsLoading(true);
    try {
      const data = await getApiKey();
      setApiKey(data.value);
    } finally {
      setIsLoading(false);
    }
  };
  const handleRegenerate = async () => {
    setIsLoading(true);
    try {
      const data = await regenerateApiKey();
      setApiKey(data.value);
    } finally {
      setIsLoading(false);
    }
  };
  const handleCopy = async () => {
    if (apiKey) {
      try {
        await navigator.clipboard.writeText(apiKey);
        toggleNotification({ type: "success", message: "API key copied to clipboard!" });
      } catch {
        toggleNotification({ type: "warning", message: "Failed to copy API key." });
      }
    }
  };
  const handleOpenChange = (open) => {
    setIsOpen(open);
    if (open) {
      handleFetchApiKey();
    }
  };
  const handleClose = () => setIsOpen(false);
  return {
    apiKey,
    isOpen,
    isLoading,
    handleClose,
    handleCopy,
    handleOpenChange,
    handleFetchApiKey,
    handleRegenerate
  };
};
const SettingsModal = () => {
  const { apiKey, isOpen, isLoading, handleCopy, handleClose, handleOpenChange, handleRegenerate } = useHook$5();
  const renderRefreshIcon = () => /* @__PURE__ */ jsxRuntime.jsxs(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        /* @__PURE__ */ jsxRuntime.jsx("polyline", { points: "23 4 23 10 17 10" }),
        /* @__PURE__ */ jsxRuntime.jsx("polyline", { points: "1 20 1 14 7 14" }),
        /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M3.51 9a9 9 0 0114.36-3.36L23 10" }),
        /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M20.49 15a9 9 0 01-14.36 3.36L1 14" })
      ]
    }
  );
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { variant: "tertiary", onClick: () => handleOpenChange(true), startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.Cog, {}), children: "Settings" }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Root, { open: isOpen, onOpenChange: handleOpenChange, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Modal.Content, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Header, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Title, { children: "API Key" }) }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Body, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", gap: "2rem", children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "omega", textColor: "neutral600", children: "You can use this API key to authenticate external translation API calls." }),
        /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Field.Root, { paddingRight: "0", width: "100%", children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: "API Key" }),
          /* @__PURE__ */ jsxRuntime.jsxs(
            designSystem.Flex,
            {
              alignItems: "center",
              background: "neutral100",
              borderRadius: "4px",
              borderWidth: "1px",
              borderStyle: "solid",
              borderColor: "neutral200",
              gap: "1rem",
              padding: "0.5rem",
              paddingLeft: "1rem",
              children: [
                /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { flex: "1", padding: "0.5rem 1rem", children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { textColor: "neutral600", fontSize: "sm", children: apiKey || "••••••••••••••••••••••••••••••••••••••••" }) }),
                /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: "0.5rem", children: [
                  /* @__PURE__ */ jsxRuntime.jsx(
                    designSystem.Button,
                    {
                      variant: "secondary",
                      onClick: handleCopy,
                      startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.Duplicate, {}),
                      disabled: !apiKey,
                      children: "Copy"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntime.jsx(
                    designSystem.Button,
                    {
                      variant: "danger",
                      onClick: handleRegenerate,
                      startIcon: renderRefreshIcon(),
                      loading: isLoading,
                      children: "Regenerate"
                    }
                  )
                ] })
              ]
            }
          )
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Footer, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { justifyContent: "flex-end", gap: "1rem", children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { variant: "tertiary", onClick: handleClose, children: "Close" }) }) })
    ] }) })
  ] });
};
const ProjectCard = ({
  onClipboardCopy,
  onEdit,
  onDelete,
  onViewAllTranslations,
  project
}) => /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Card, { height: "100%", width: "100%", children: [
  /* @__PURE__ */ jsxRuntime.jsx(designSystem.CardBody, { minHeight: "100px", width: "320px", children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.CardContent, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.CardTitle, { variant: "beta", fontWeight: "bold", marginTop: "0.4rem", children: project.name }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Divider, { background: "neutral200", marginTop: "0.5rem", marginBottom: "0.5rem", width: "100%" }),
    /* @__PURE__ */ jsxRuntime.jsxs(
      designSystem.Flex,
      {
        gap: 1,
        onClick: onClipboardCopy(project),
        alignItems: "center",
        marginTop: "0.5rem",
        style: { opacity: 0.8, wordBreak: "break-all" },
        children: [
          /* @__PURE__ */ jsxRuntime.jsx(icons.Duplicate, {}),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { fontSize: "1rem", children: project.documentId })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { paddingTop: "1rem", paddingBottom: "1rem", style: { display: "flex", flex: 1 }, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { flex: "1", variant: "omega", style: { wordBreak: "break-word" }, children: project.description }) })
  ] }) }),
  /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { display: "flex", gap: "15rem", justifyContent: "flex-start", padding: "1rem", width: "100%", children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { display: "flex", children: /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.Button,
      {
        color: "white",
        gap: "0",
        onClick: onViewAllTranslations(project),
        startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.Eye, { color: "white" }),
        title: "View all translations"
      }
    ) }),
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { display: "flex", gap: "0.5rem", justifyContent: "flex-end", children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        designSystem.Button,
        {
          color: "white",
          gap: "0",
          variant: "secondary",
          onClick: onDelete(project),
          startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.Trash, { color: "white" })
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { gap: "0", onClick: onEdit(project), startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.Pencil, { color: "white" }) })
    ] })
  ] })
] });
const { post: post$1, put: put$1, del: del$3 } = admin.getFetchClient();
const createProject = async ({ name, description }) => {
  return post$1(`/${index.PLUGIN_ID}/api/projects`, { name, description }).then((res) => res.data);
};
const updateProject = async ({ id, name, description }) => {
  return put$1(`/${index.PLUGIN_ID}/api/projects/${id}`, { name, description }).then((res) => res.data);
};
const deleteProject$1 = async (id) => {
  return del$3(`/${index.PLUGIN_ID}/api/projects/${id}`).then((res) => res.data);
};
const useHook$4 = ({ ref, refetch }) => {
  const [currentProject, setCurrentProject] = react.useState(null);
  const [isLoadingDelete, setIsLoadingDelete] = react.useState(false);
  const [isLoadingSave, setIsLoadingSave] = react.useState(false);
  const [isOpen, setIsOpen] = react.useState(false);
  const [name, setName] = react.useState("");
  const [description, setDescription] = react.useState("");
  const handleClose = () => {
    setIsOpen(false);
  };
  const handleDelete = async () => {
    if (currentProject) {
      setIsLoadingDelete(true);
      await deleteProject$1(currentProject.id);
      setIsLoadingDelete(false);
    }
    handleClose();
    refetch();
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleOpenChange = (open) => {
    setIsOpen(open);
  };
  const handleOpenModal = (data) => {
    setIsOpen(true);
    setCurrentProject(data || null);
    if (data) {
      setName(data.name);
      setDescription(data.description || "");
    } else {
      setName("");
      setDescription("");
    }
  };
  const handleSave = async () => {
    setIsLoadingSave(true);
    if (currentProject) {
      await updateProject({ id: currentProject.id, name, description });
    } else {
      await createProject({ name, description });
    }
    handleClose();
    refetch();
    setIsLoadingSave(false);
  };
  react.useImperativeHandle(ref, () => ({
    open: handleOpenModal
  }));
  return {
    currentProject,
    description,
    handleClose,
    handleDelete,
    handleDescriptionChange,
    handleNameChange,
    handleOpenChange,
    handleSave,
    isLoadingDelete,
    isLoadingSave,
    isOpen,
    name
  };
};
const ProjectCreateEditModal = react.forwardRef(({ refetch }, ref) => {
  const {
    currentProject,
    isLoadingDelete,
    isLoadingSave,
    isOpen,
    name,
    description,
    handleClose,
    handleDelete,
    handleDescriptionChange,
    handleNameChange,
    handleOpenChange,
    handleSave
  } = useHook$4({ ref, refetch });
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Root, { open: isOpen, onOpenChange: handleOpenChange, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Modal.Content, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Header, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Title, { children: "Create project" }) }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Body, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { flex: "1", direction: "column", gap: "2rem", children: [
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Field.Root, { flex: "1", required: true, width: "100%", children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: "Name" }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Input, { value: name, onChange: handleNameChange })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Field.Root, { flex: "1", width: "100%", children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: "Description" }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Textarea, { value: description, onChange: handleDescriptionChange })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Modal.Footer, { children: [
      !!currentProject && /* @__PURE__ */ jsxRuntime.jsx(
        designSystem.Button,
        {
          color: "white",
          gap: "0",
          loading: isLoadingDelete,
          variant: "secondary",
          onClick: handleDelete,
          startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.Trash, { color: "white" })
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: "1rem", children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { onClick: handleClose, variant: "tertiary", children: "Cancel" }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { loading: isLoadingSave, onClick: handleSave, children: "Save" })
      ] })
    ] })
  ] }) });
});
const { get: get$6, del: del$2 } = admin.getFetchClient();
const getProjects = async () => {
  const { data } = await get$6(`/${index.PLUGIN_ID}/api/projects`);
  return data;
};
const deleteProject = async (id) => {
  const { data } = await del$2(`/${index.PLUGIN_ID}/api/projects/${id}`);
  return data;
};
const useHook$3 = () => {
  const { toggleNotification } = admin.useNotification();
  const navigate = reactRouterDom.useNavigate();
  const confirmDeleteModalRef = react.useRef(null);
  const projectCreatedEditModalRef = react.useRef(null);
  const [isPending, setIsPending] = react.useState(true);
  const [projects, setProjects] = react.useState(
    null
  );
  const [selectedDeleteProject, setSelectedDeleteProject] = react.useState(null);
  const handleClipboardCopy = (project) => (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(project.documentId);
    toggleNotification({
      type: "success",
      message: "Copied to clipboard!"
    });
  };
  const handleEdit = (project) => (e) => {
    e.preventDefault();
    projectCreatedEditModalRef.current?.open(project);
  };
  const handleViewAllTranslations = (project) => (e) => {
    e.preventDefault();
    navigate(`/plugins/${index.PLUGIN_ID}/projects/${project.id}/translations`);
  };
  const handleToggleDelete = (project) => async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (project) {
      setSelectedDeleteProject(project);
      confirmDeleteModalRef.current?.open(project);
    } else {
      setSelectedDeleteProject(null);
    }
  };
  const handleDeleteConfirm = async () => {
    if (selectedDeleteProject?.documentId) {
      try {
        await deleteProject(selectedDeleteProject.documentId);
        await handleRefetch();
        toggleNotification({
          type: "success",
          message: "Project deleted successfully!"
        });
        return true;
      } catch (error) {
        console.error(error);
        toggleNotification({
          type: "danger",
          message: "Failed to delete project."
        });
      }
    }
    return false;
  };
  const handleProjectCreate = () => {
    projectCreatedEditModalRef.current?.open();
  };
  const handleRefetch = async () => {
    setIsPending(true);
    const data = await getProjects();
    setProjects(data);
    setIsPending(false);
  };
  react.useEffect(() => {
    handleRefetch();
  }, []);
  return {
    confirmDeleteModalRef,
    handleClipboardCopy,
    handleDeleteConfirm,
    handleEdit,
    handleProjectCreate,
    handleRefetch,
    handleToggleDelete,
    handleViewAllTranslations,
    isPending,
    projectCreatedEditModalRef,
    projects,
    selectedDeleteProject
  };
};
const ProjectsList = () => {
  const {
    confirmDeleteModalRef,
    handleClipboardCopy,
    handleDeleteConfirm,
    handleEdit,
    handleProjectCreate,
    handleRefetch,
    handleToggleDelete,
    handleViewAllTranslations,
    isPending,
    projectCreatedEditModalRef,
    projects,
    selectedDeleteProject
  } = useHook$3();
  const renderLoader = () => {
    if (isPending && !projects?.items.length) {
      return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Loader, {}) });
    }
    return /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, {});
  };
  const renderEmptyState = () => {
    if (!isPending && !projects?.items.length) {
      return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { background: "neutral100", children: /* @__PURE__ */ jsxRuntime.jsx(
        designSystem.EmptyStateLayout,
        {
          content: "You don't have any projects yet.",
          action: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { onClick: handleProjectCreate, startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.Plus, {}), variant: "secondary", children: "Create your first project" })
        }
      ) });
    }
    return /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, {});
  };
  const renderContent = () => {
    if (!isPending && !projects?.items.length) {
      return /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, {});
    }
    return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
      !!projects?.items?.length && /* @__PURE__ */ jsxRuntime.jsx(
        designSystem.Button,
        {
          marginBottom: "1rem",
          onClick: handleProjectCreate,
          startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.Plus, {}),
          variant: "secondary",
          children: "Add project"
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Root, { gap: 2, children: projects?.items.map((project) => /* @__PURE__ */ jsxRuntime.jsx(
        reactRouterDom.Link,
        {
          to: `/plugins/${index.PLUGIN_ID}/projects/${project.id}`,
          style: { color: "white", textDecoration: "none" },
          children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { id: project.id, background: "primary100", height: "100%", children: /* @__PURE__ */ jsxRuntime.jsx(
            ProjectCard,
            {
              onClipboardCopy: handleClipboardCopy,
              onEdit: handleEdit,
              onDelete: handleToggleDelete,
              onViewAllTranslations: handleViewAllTranslations,
              project
            }
          ) })
        },
        project.id
      )) })
    ] });
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    renderContent(),
    renderEmptyState(),
    renderLoader(),
    /* @__PURE__ */ jsxRuntime.jsx(ProjectCreateEditModal, { ref: projectCreatedEditModalRef, refetch: handleRefetch }),
    /* @__PURE__ */ jsxRuntime.jsx(
      ConfirmModal,
      {
        ref: confirmDeleteModalRef,
        onConfirm: handleDeleteConfirm,
        title: "Delete Project",
        text: `Are you sure you want to delete the project "${selectedDeleteProject?.name}"? This action cannot be undone.`
      }
    )
  ] });
};
const ProjectsPage = () => /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Main, { padding: "2rem", children: [
  /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Box, { paddingBottom: "1rem", children: [
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { paddingBottom: "0.5rem", gap: "1rem", children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "alpha", children: "Static translations" }),
      /* @__PURE__ */ jsxRuntime.jsx(SettingsModal, {})
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Breadcrumbs, { label: "Folder navigatation", children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Crumb, { isCurrent: true, children: "Projects" }) })
  ] }),
  /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { padding: "1rem", children: /* @__PURE__ */ jsxRuntime.jsx(ProjectsList, {}) })
] });
const { get: get$5 } = admin.getFetchClient();
const getNamespaces = async (projectId) => {
  return get$5(`/${index.PLUGIN_ID}/api/projects/${projectId}/namespaces/all`).then(
    (res) => res.data
  );
};
const useNamespaces = ({ projectId }) => {
  const [namespaces, setNamespaces] = react.useState([]);
  const refetchNamespaces = async () => {
    if (!projectId) {
      return;
    }
    const data = await getNamespaces(projectId);
    setNamespaces(data);
  };
  react.useEffect(() => {
    refetchNamespaces();
  }, []);
  return { namespaces };
};
const { get: get$4 } = admin.getFetchClient();
const getLocales = async () => {
  const { data } = await get$4("/i18n/locales");
  return data;
};
const useLocales = () => {
  const [locales, setLocales] = react.useState([]);
  const refetchLocales = async () => {
    const data = await getLocales();
    setLocales(data);
  };
  react.useEffect(() => {
    refetchLocales();
  }, []);
  return { locales };
};
const { get: get$3, post, put, del: del$1 } = admin.getFetchClient();
const getTranslation = async ({
  namespaceId,
  page,
  projectId,
  showMissingOnly,
  search
}) => {
  const searchParam = search ? `&search=${encodeURIComponent(search)}` : "";
  return get$3(
    `/${index.PLUGIN_ID}/api/projects/${projectId}/namespaces/${namespaceId}/translations?page=${page}&showMissingOnly=${showMissingOnly}${searchParam}`
  ).then((res) => res.data);
};
const createTranslation = async ({
  projectId,
  namespaceId,
  key,
  translations
}) => {
  try {
    const response = await post(
      `/${index.PLUGIN_ID}/api/projects/${projectId}/namespaces/${namespaceId}/translations`,
      {
        key,
        translations
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating translation:", error);
    throw error;
  }
};
const updateTranslation = async ({
  projectId,
  namespaceId,
  id,
  key,
  translations
}) => {
  try {
    const response = await put(
      `/${index.PLUGIN_ID}/api/projects/${projectId}/namespaces/${namespaceId}/translations/${id}`,
      {
        key,
        translations
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating translation:", error);
    throw error;
  }
};
const deleteTranslation$1 = async ({
  namespaceId,
  projectId,
  translationId
}) => {
  try {
    const response = await del$1(
      `/${index.PLUGIN_ID}/api/projects/${projectId}/namespaces/${namespaceId}/translations/${translationId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
const useHook$2 = ({ namespaceId, projectId, ref, refetch }) => {
  const [currentTranslation, setCurrentTranslation] = react.useState(null);
  const [isLoadingDelete, setIsLoadingDelete] = react.useState(false);
  const [isLoadingSave, setIsLoadingSave] = react.useState(false);
  const [isOpen, setIsOpen] = react.useState(false);
  const [key, setKey] = react.useState("");
  const [selectedNamespaceId, setSelectedNamespaceId] = react.useState(namespaceId);
  const [translations, setTranslations] = react.useState({});
  const { locales } = useLocales();
  const { namespaces } = useNamespaces({ projectId });
  const handleClose = () => {
    setIsOpen(false);
    setCurrentTranslation(null);
    setKey("");
    setSelectedNamespaceId(namespaceId);
    setTranslations({});
  };
  const handleDelete = async () => {
    if (currentTranslation) {
      setIsLoadingDelete(true);
      await deleteTranslation$1({ namespaceId, projectId, translationId: currentTranslation.id });
      setIsLoadingDelete(false);
    }
    handleClose();
    refetch();
  };
  const handleTranslationsChange = (key2) => (e) => {
    setTranslations((prev) => ({ ...prev, [key2]: e.target.value }));
  };
  const handleKeyChange = (e) => {
    const newKey = e.target.value;
    setKey(newKey);
  };
  const handleNamespaceChange = (value) => {
    setSelectedNamespaceId(value);
  };
  const handleOpenChange = (open) => {
    setIsOpen(open);
  };
  const handleOpenModal = (data) => {
    setIsOpen(true);
    setCurrentTranslation(data || null);
    if (data) {
      setKey(data.key);
      setSelectedNamespaceId(namespaceId);
      const translationsData = {};
      locales.forEach((locale) => {
        const defaultValue = data[locale.code] || "";
        translationsData[locale.code] = defaultValue;
      });
      setTranslations(translationsData);
    } else {
      setKey("");
      setTranslations((prev) => {
        const updated = { ...prev };
        locales.forEach((locale) => {
          if (!(locale.code in updated)) {
            const defaultValue = currentTranslation ? currentTranslation[locale.code] || "" : "";
            updated[locale.code] = defaultValue;
          }
        });
        return updated;
      });
      setCurrentTranslation(null);
      setSelectedNamespaceId(namespaceId);
    }
  };
  const handleSave = async () => {
    setIsLoadingSave(true);
    try {
      const translationsData = {};
      locales.forEach((locale) => {
        const defaultValue = translations[locale.code] || "";
        translationsData[locale.code] = defaultValue;
      });
      if (currentTranslation) {
        await updateTranslation({
          id: currentTranslation.id,
          key,
          namespaceId: selectedNamespaceId,
          projectId,
          translations: translationsData
        });
      } else {
        await createTranslation({
          namespaceId: selectedNamespaceId,
          key,
          projectId,
          translations: translationsData
        });
      }
      handleClose();
      refetch();
    } catch (error) {
      console.error("Error saving namespace:", error);
    }
    setIsLoadingSave(false);
  };
  react.useEffect(() => {
    if (locales) {
      setTranslations((prev) => {
        const updated = { ...prev };
        locales.forEach((locale) => {
          if (!(locale.code in updated)) {
            const defaultValue = currentTranslation ? currentTranslation[locale.code] || "" : "";
            updated[locale.code] = defaultValue;
          }
        });
        return updated;
      });
    }
  }, [currentTranslation]);
  react.useImperativeHandle(ref, () => ({
    open: handleOpenModal
  }));
  return {
    currentTranslation,
    handleClose,
    handleDelete,
    handleKeyChange,
    handleNamespaceChange,
    handleTranslationsChange,
    handleOpenChange,
    handleSave,
    isLoadingDelete,
    isLoadingSave,
    isOpen,
    key,
    locales,
    namespaces,
    translations,
    selectedNamespaceId
  };
};
const TranslationCreateEditModal = react.forwardRef(
  ({ namespaceId, projectId, refetch }, ref) => {
    const {
      currentTranslation,
      handleClose,
      handleDelete,
      handleKeyChange,
      handleNamespaceChange,
      handleOpenChange,
      handleTranslationsChange,
      handleSave,
      isLoadingDelete,
      isLoadingSave,
      isOpen,
      key,
      locales,
      namespaces,
      selectedNamespaceId,
      translations
    } = useHook$2({ namespaceId, projectId, ref, refetch });
    return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Root, { open: isOpen, onOpenChange: handleOpenChange, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Modal.Content, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Header, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Title, { children: "Create namespace" }) }),
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Modal.Body, { children: [
        /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { flex: "1", direction: "column", gap: "2rem", children: [
          /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Field.Root, { flex: "1", required: true, width: "100%", children: [
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: "Namespace" }),
            /* @__PURE__ */ jsxRuntime.jsx(
              designSystem.SingleSelect,
              {
                required: true,
                onChange: handleNamespaceChange,
                placeholder: "Select namespace",
                value: selectedNamespaceId,
                children: namespaces.map((ns) => /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: ns.id, children: ns.name }, ns.id))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Field.Root, { flex: "1", required: true, width: "100%", children: [
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: "Key" }),
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Input, { onChange: handleKeyChange, value: key })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Divider, { marginTop: "2rem", marginBottom: "2rem" }),
        locales.map((locale) => /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Field.Root, { marginBottom: "1.5rem", required: locale.code === "en", children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: locale.name }),
          /* @__PURE__ */ jsxRuntime.jsx(
            designSystem.Textarea,
            {
              onChange: handleTranslationsChange(locale.code),
              rows: 4,
              value: translations[locale.code] || ""
            }
          )
        ] }, locale.code))
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Modal.Footer, { children: [
        !!currentTranslation && /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.Button,
          {
            color: "white",
            gap: "0",
            loading: isLoadingDelete,
            variant: "secondary",
            onClick: handleDelete,
            startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.Trash, { color: "white" })
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: "1rem", children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { onClick: handleClose, variant: "tertiary", children: "Cancel" }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { loading: isLoadingSave, onClick: handleSave, children: "Save" })
        ] })
      ] })
    ] }) });
  }
);
const useHook$1 = () => {
  const params = reactRouterDom.useParams();
  const namespaceId = Number(params.namespaceId);
  const projectId = Number(params.projectId);
  const [searchParams, setSearchParams] = reactRouterDom.useSearchParams();
  const confirmDeleteModalRef = react.useRef(null);
  const translationCreatedEditModalRef = react.useRef(
    null
  );
  const [selectedDeleteTranslation, setSelectedDeleteTranslation] = react.useState(
    null
  );
  const [isPending, setIsPending] = react.useState(true);
  const [translations, setTranslations] = react.useState(null);
  const [showMissingTranslationsOnly, setShowMissingTranslationsOnly] = react.useState(false);
  const [searchQuery, setSearchQuery] = react.useState("");
  const handleEditTranslation = (translation) => () => {
    translationCreatedEditModalRef.current?.open(translation);
  };
  const handleToggleDeleteTranslation = (translation) => async () => {
    if (translation) {
      setSelectedDeleteTranslation(translation);
      confirmDeleteModalRef.current?.open(translation);
    } else {
      setSelectedDeleteTranslation(null);
    }
  };
  const handleDeleteConfirm = async () => {
    if (namespaceId && projectId && selectedDeleteTranslation?.id) {
      try {
        await deleteTranslation$1({
          namespaceId,
          projectId,
          translationId: selectedDeleteTranslation.id
        });
        handleRefetch({
          page: Number(searchParams.get("page")) || 1,
          showMissingOnly: showMissingTranslationsOnly,
          search: searchQuery
        });
        return true;
      } catch (error) {
        console.error(error);
      }
    }
    return false;
  };
  const handleTranslationCreate = () => {
    translationCreatedEditModalRef.current?.open();
  };
  const handlePagePress = (page) => {
    setSearchParams({ page: String(page) });
    handleRefetch({ page, showMissingOnly: showMissingTranslationsOnly, search: searchQuery });
  };
  const handleSearchChange = (value) => {
    setSearchQuery(value);
    setSearchParams({ page: "1" });
    handleRefetch({ page: 1, showMissingOnly: showMissingTranslationsOnly, search: value });
  };
  const handleRefetch = async ({
    page,
    showMissingOnly,
    search
  } = {
    page: 1,
    showMissingOnly: showMissingTranslationsOnly,
    search: ""
  }) => {
    const currentPage = page || 1;
    const searchTerm = search !== void 0 ? search : searchQuery;
    if (projectId) {
      setIsPending(true);
      const data = await getTranslation({
        namespaceId: Number(namespaceId),
        page: currentPage,
        projectId: Number(projectId),
        showMissingOnly,
        search: searchTerm
      });
      setTranslations(data);
      setIsPending(false);
    }
  };
  const handleShowMissingTranslationsOnlyChange = (value) => {
    setShowMissingTranslationsOnly(value);
    handleRefetch({ page: 1, showMissingOnly: value, search: searchQuery });
  };
  react.useEffect(() => {
    if (projectId) {
      handleRefetch({ page: 1, showMissingOnly: showMissingTranslationsOnly, search: "" });
    }
  }, [projectId]);
  return {
    confirmDeleteModalRef,
    handleDeleteConfirm,
    handleEditTranslation,
    handlePagePress,
    handleRefetch,
    handleSearchChange,
    handleShowMissingTranslationsOnlyChange,
    handleToggleDeleteTranslation,
    handleTranslationCreate,
    isPending,
    namespaceId,
    searchQuery,
    translations,
    projectId,
    selectedDeleteTranslation,
    showMissingTranslationsOnly,
    translationCreatedEditModalRef
  };
};
const Translations = () => {
  const { locales } = useLocales();
  const {
    confirmDeleteModalRef,
    handleDeleteConfirm,
    handleEditTranslation,
    handleTranslationCreate,
    handlePagePress,
    handleRefetch,
    handleSearchChange,
    handleShowMissingTranslationsOnlyChange,
    handleToggleDeleteTranslation,
    isPending,
    namespaceId,
    searchQuery,
    translations,
    projectId,
    selectedDeleteTranslation,
    showMissingTranslationsOnly,
    translationCreatedEditModalRef
  } = useHook$1();
  const renderLoader = () => {
    if (isPending && !translations?.items.length) {
      return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Loader, {}) });
    }
    return /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, {});
  };
  const renderEmptyState = () => {
    if (!isPending && !translations?.items) {
      return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { background: "neutral100", children: /* @__PURE__ */ jsxRuntime.jsx(
        designSystem.EmptyStateLayout,
        {
          content: "You don't have any translations yet.",
          action: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { onClick: handleTranslationCreate, startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.Plus, {}), variant: "secondary", children: "Create your first translation" })
        }
      ) });
    }
    if (!isPending && !!translations?.items && !translations?.items.length) {
      return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { background: "neutral100", children: /* @__PURE__ */ jsxRuntime.jsx(
        designSystem.EmptyStateLayout,
        {
          content: "There are no translations.",
          action: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { onClick: handleTranslationCreate, startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.Plus, {}), variant: "secondary", children: "Create translation" })
        }
      ) });
    }
    return /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, {});
  };
  const renderContent = () => {
    if (!isPending && !translations?.items.length) {
      return /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, {});
    }
    return /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Box, { paddingTop: "1rem", paddingBottom: "1rem", children: [
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Table, { colCount: 3, rowCount: translations?.items?.length || 0, children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Thead, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Tr, { style: { width: "280px" }, children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", children: "Key" }) }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", children: "Translations" }) }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { style: { width: "120px" }, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", children: "Actions" }) })
        ] }) }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Tbody, { children: translations?.items?.map((translation) => {
          const isMissing = Object.values(locales).some(
            (locale) => !translation[locale.code]
          );
          return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Tr, { children: [
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { style: { width: "280px", verticalAlign: "top" }, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: 2, paddingTop: "15px", children: [
              /* @__PURE__ */ jsxRuntime.jsx(
                designSystem.Typography,
                {
                  cursor: "pointer",
                  fontWeight: "bold",
                  onClick: handleEditTranslation(translation),
                  variant: "omega",
                  children: translation.key
                }
              ),
              isMissing && /* @__PURE__ */ jsxRuntime.jsx(designSystem.Badge, { backgroundColor: "red", style: { padding: "2px 6px" }, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { fontWeight: "bold", textColor: "white", fontSize: "9px", children: "Missing" }) })
            ] }) }),
            /* @__PURE__ */ jsxRuntime.jsx(
              designSystem.Td,
              {
                style: {
                  paddingTop: "10px",
                  paddingBottom: "10px",
                  whiteSpace: "normal",
                  wordBreak: "break-word"
                },
                children: locales.map((locale) => /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { marginRight: 1, padding: 1, alignItems: "flex-start", children: [
                  /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { display: "flex", children: /* @__PURE__ */ jsxRuntime.jsxs(
                    designSystem.Typography,
                    {
                      lineHeight: "14px",
                      fontWeight: "bold",
                      variant: "omega",
                      style: { minWidth: "100px" },
                      children: [
                        locale.name,
                        ":",
                        " "
                      ]
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { lineHeight: "16px", variant: "omega", children: translation[locale.code] || "-" })
                ] }, locale.code))
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { style: { width: "120px" }, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: "0.5rem", justifyContent: "flex-end", children: [
              /* @__PURE__ */ jsxRuntime.jsx(
                designSystem.Button,
                {
                  gap: "0",
                  onClick: handleEditTranslation(translation),
                  variant: "secondary",
                  startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.Pencil, {})
                }
              ),
              /* @__PURE__ */ jsxRuntime.jsx(
                designSystem.Button,
                {
                  gap: "0",
                  onClick: handleToggleDeleteTranslation(translation),
                  startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.Trash, { color: "white" }),
                  variant: "danger"
                }
              )
            ] }) })
          ] }, translation.id);
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { justifyContent: "space-between", paddingTop: "1rem", children: translations?.pagination && /* @__PURE__ */ jsxRuntime.jsx(Pagination, { pagination: translations?.pagination, onPagePress: handlePagePress }) })
    ] }) });
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { marginBottom: "2rem", width: "100%", children: /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.TextInput,
      {
        name: "search",
        placeholder: "Search by key or translation value...",
        value: searchQuery,
        onChange: (e) => handleSearchChange(e.target.value)
      }
    ) }),
    /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { marginBottom: "1rem", gap: "1rem", children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { onClick: handleTranslationCreate, startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.Plus, {}), variant: "secondary", children: "Add translation" }),
      /* @__PURE__ */ jsxRuntime.jsx(
        designSystem.Switch,
        {
          checked: showMissingTranslationsOnly,
          name: "showMissingTranslationsOnly",
          onLabel: "Show missing translations only",
          offLabel: "Show missing translations only",
          onCheckedChange: handleShowMissingTranslationsOnlyChange,
          visibleLabels: true
        }
      )
    ] }) }),
    renderContent(),
    renderEmptyState(),
    renderLoader(),
    /* @__PURE__ */ jsxRuntime.jsx(
      TranslationCreateEditModal,
      {
        ref: translationCreatedEditModalRef,
        namespaceId,
        projectId,
        refetch: handleRefetch
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(
      ConfirmModal,
      {
        ref: confirmDeleteModalRef,
        onCancel: handleToggleDeleteTranslation(),
        onConfirm: handleDeleteConfirm,
        text: `Are you sure you want to delete "${selectedDeleteTranslation?.key}"? This action cannot be undone.`,
        title: "Delete translation"
      }
    )
  ] });
};
const { get: get$2 } = admin.getFetchClient();
const getNamespace = async (id) => {
  return get$2(`/${index.PLUGIN_ID}/api/projects/${id}/namespaces/${id}`).then((res) => res.data);
};
const TranslationsPage = () => {
  const params = reactRouterDom.useParams();
  const { namespaceId, projectId } = params;
  const [namespace, setNamespace] = react.useState(null);
  react.useEffect(() => {
    const fetchNamespace = async () => {
      if (namespaceId) {
        const data = await getNamespace(namespaceId);
        setNamespace(data);
      }
    };
    fetchNamespace();
  }, [namespaceId]);
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Main, { padding: "2rem", children: [
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Box, { paddingBottom: "1rem", children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { paddingBottom: "0.5rem", gap: "1rem", children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "alpha", children: "Static translations" }) }),
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Breadcrumbs, { label: "Folder navigatation", children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.CrumbLink, { href: `/admin/plugins/${index.PLUGIN_ID}`, children: "Projects" }),
        /* @__PURE__ */ jsxRuntime.jsxs(designSystem.CrumbLink, { href: `/admin/plugins/${index.PLUGIN_ID}/projects/${projectId}`, children: [
          "Namespaces ",
          namespace ? ` - ${namespace.name}` : ""
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Crumb, { isCurrent: true, children: "Translations" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { padding: "1rem", children: /* @__PURE__ */ jsxRuntime.jsx(Translations, {}) })
  ] });
};
const { get: get$1, del } = admin.getFetchClient();
const getProjectTranslations = async ({
  page,
  projectId,
  showMissingOnly,
  search
}) => {
  const searchParam = search ? `&search=${encodeURIComponent(search)}` : "";
  return get$1(
    `/${index.PLUGIN_ID}/api/projects/${projectId}/translations?page=${page}&showMissingOnly=${showMissingOnly}${searchParam}`
  ).then((res) => res.data);
};
const deleteTranslation = async ({
  projectId,
  translationId
}) => {
  try {
    const translation = await get$1(
      `/${index.PLUGIN_ID}/api/projects/${projectId}/translations/${translationId}`
    );
    const namespaceId = translation.data.namespace?.id;
    if (!namespaceId) {
      throw new Error("Cannot find namespace for translation");
    }
    const response = await del(
      `/${index.PLUGIN_ID}/api/projects/${projectId}/namespaces/${namespaceId}/translations/${translationId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
const useHook = () => {
  const params = reactRouterDom.useParams();
  const projectId = Number(params.projectId);
  const [searchParams, setSearchParams] = reactRouterDom.useSearchParams();
  const confirmDeleteModalRef = react.useRef(null);
  const translationCreatedEditModalRef = react.useRef(
    null
  );
  const [selectedDeleteTranslation, setSelectedDeleteTranslation] = react.useState(
    null
  );
  const [isPending, setIsPending] = react.useState(true);
  const [translations, setTranslations] = react.useState(null);
  const [showMissingTranslationsOnly, setShowMissingTranslationsOnly] = react.useState(false);
  const [searchQuery, setSearchQuery] = react.useState("");
  const handleEditTranslation = (translation) => () => {
    translationCreatedEditModalRef.current?.open(translation);
  };
  const handleToggleDeleteTranslation = (translation) => async () => {
    if (translation) {
      setSelectedDeleteTranslation(translation);
      confirmDeleteModalRef.current?.open(translation);
    } else {
      setSelectedDeleteTranslation(null);
    }
  };
  const handleDeleteConfirm = async () => {
    if (projectId && selectedDeleteTranslation?.id) {
      try {
        await deleteTranslation({
          projectId,
          translationId: selectedDeleteTranslation.id
        });
        handleRefetch({
          page: Number(searchParams.get("page")) || 1,
          showMissingOnly: showMissingTranslationsOnly,
          search: searchQuery
        });
        return true;
      } catch (error) {
        console.error(error);
      }
    }
    return false;
  };
  const handleTranslationCreate = () => {
    translationCreatedEditModalRef.current?.open();
  };
  const handlePagePress = (page) => {
    setSearchParams({ page: String(page) });
    handleRefetch({ page, showMissingOnly: showMissingTranslationsOnly, search: searchQuery });
  };
  const handleSearchChange = (value) => {
    setSearchQuery(value);
    setSearchParams({ page: "1" });
    handleRefetch({ page: 1, showMissingOnly: showMissingTranslationsOnly, search: value });
  };
  const handleRefetch = async ({
    page,
    showMissingOnly,
    search
  } = {
    page: 1,
    showMissingOnly: showMissingTranslationsOnly,
    search: ""
  }) => {
    const currentPage = page || 1;
    const searchTerm = search !== void 0 ? search : searchQuery;
    if (projectId) {
      setIsPending(true);
      const data = await getProjectTranslations({
        page: currentPage,
        projectId: Number(projectId),
        showMissingOnly,
        search: searchTerm
      });
      setTranslations(data);
      setIsPending(false);
    }
  };
  const handleShowMissingTranslationsOnlyChange = (value) => {
    setShowMissingTranslationsOnly(value);
    handleRefetch({ page: 1, showMissingOnly: value, search: searchQuery });
  };
  react.useEffect(() => {
    if (projectId) {
      handleRefetch({ page: 1, showMissingOnly: showMissingTranslationsOnly, search: "" });
    }
  }, [projectId]);
  return {
    confirmDeleteModalRef,
    handleDeleteConfirm,
    handleEditTranslation,
    handlePagePress,
    handleRefetch,
    handleSearchChange,
    handleShowMissingTranslationsOnlyChange,
    handleToggleDeleteTranslation,
    handleTranslationCreate,
    isPending,
    searchQuery,
    translations,
    projectId,
    selectedDeleteTranslation,
    showMissingTranslationsOnly,
    translationCreatedEditModalRef
  };
};
const ProjectTranslations = () => {
  const { locales } = useLocales();
  const {
    confirmDeleteModalRef,
    handleDeleteConfirm,
    handleEditTranslation,
    handlePagePress,
    handleRefetch,
    handleSearchChange,
    handleShowMissingTranslationsOnlyChange,
    handleToggleDeleteTranslation,
    handleTranslationCreate,
    isPending,
    searchQuery,
    translations,
    projectId,
    selectedDeleteTranslation,
    showMissingTranslationsOnly,
    translationCreatedEditModalRef
  } = useHook();
  const renderLoader = () => {
    if (isPending && !translations?.items.length) {
      return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Loader, {}) });
    }
    return /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, {});
  };
  const renderEmptyState = () => {
    if (!isPending && !translations?.items) {
      return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { background: "neutral100", children: /* @__PURE__ */ jsxRuntime.jsx(
        designSystem.EmptyStateLayout,
        {
          content: "You don't have any translations yet.",
          action: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { onClick: handleTranslationCreate, startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.Plus, {}), variant: "secondary", children: "Create your first translation" })
        }
      ) });
    }
    if (!isPending && !!translations?.items && !translations?.items.length) {
      return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { background: "neutral100", children: /* @__PURE__ */ jsxRuntime.jsx(
        designSystem.EmptyStateLayout,
        {
          content: "There are no translations.",
          action: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { onClick: handleTranslationCreate, startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.Plus, {}), variant: "secondary", children: "Create translation" })
        }
      ) });
    }
    return /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, {});
  };
  const renderContent = () => {
    if (!isPending && !translations?.items.length) {
      return /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, {});
    }
    return /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Box, { paddingTop: "1rem", paddingBottom: "1rem", children: [
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Table, { colCount: 3, rowCount: translations?.items?.length || 0, children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Thead, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Tr, { style: { width: "280px" }, children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", children: "Key" }) }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", children: "Translations" }) }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { style: { width: "120px" }, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", children: "Actions" }) })
        ] }) }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Tbody, { children: translations?.items?.map((translation) => {
          const isMissing = Object.values(locales).some(
            (locale) => !translation[locale.code]
          );
          return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Tr, { children: [
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { style: { width: "280px", verticalAlign: "top" }, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: 2, paddingTop: "15px", children: [
              /* @__PURE__ */ jsxRuntime.jsx(
                designSystem.Typography,
                {
                  cursor: "pointer",
                  fontWeight: "bold",
                  onClick: handleEditTranslation(translation),
                  variant: "omega",
                  children: translation.key
                }
              ),
              isMissing && /* @__PURE__ */ jsxRuntime.jsx(designSystem.Badge, { backgroundColor: "red", style: { padding: "2px 6px" }, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { fontWeight: "bold", textColor: "white", fontSize: "9px", children: "Missing" }) })
            ] }) }),
            /* @__PURE__ */ jsxRuntime.jsx(
              designSystem.Td,
              {
                style: {
                  paddingTop: "10px",
                  paddingBottom: "10px",
                  whiteSpace: "normal",
                  wordBreak: "break-word"
                },
                children: locales.map((locale) => /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { marginRight: 1, padding: 1, alignItems: "flex-start", children: [
                  /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { display: "flex", children: /* @__PURE__ */ jsxRuntime.jsxs(
                    designSystem.Typography,
                    {
                      lineHeight: "14px",
                      fontWeight: "bold",
                      variant: "omega",
                      style: { minWidth: "100px" },
                      children: [
                        locale.name,
                        ":",
                        " "
                      ]
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { lineHeight: "16px", variant: "omega", children: translation[locale.code] || "-" })
                ] }, locale.code))
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { style: { width: "120px" }, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: "0.5rem", justifyContent: "flex-end", children: [
              /* @__PURE__ */ jsxRuntime.jsx(
                designSystem.Button,
                {
                  gap: "0",
                  onClick: handleEditTranslation(translation),
                  variant: "secondary",
                  startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.Pencil, {})
                }
              ),
              /* @__PURE__ */ jsxRuntime.jsx(
                designSystem.Button,
                {
                  gap: "0",
                  onClick: handleToggleDeleteTranslation(translation),
                  startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.Trash, { color: "white" }),
                  variant: "danger"
                }
              )
            ] }) })
          ] }, translation.id);
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { justifyContent: "space-between", paddingTop: "1rem", children: translations?.pagination && /* @__PURE__ */ jsxRuntime.jsx(Pagination, { pagination: translations?.pagination, onPagePress: handlePagePress }) })
    ] }) });
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { marginBottom: "2rem", width: "100%", children: /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.TextInput,
      {
        name: "search",
        placeholder: "Search by key or translation value...",
        value: searchQuery,
        onChange: (e) => handleSearchChange(e.target.value)
      }
    ) }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { marginBottom: "1rem", gap: "1rem", children: /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.Switch,
      {
        checked: showMissingTranslationsOnly,
        name: "showMissingTranslationsOnly",
        onLabel: "Show missing translations only",
        offLabel: "Show missing translations only",
        onCheckedChange: handleShowMissingTranslationsOnlyChange,
        visibleLabels: true
      }
    ) }),
    renderContent(),
    renderEmptyState(),
    renderLoader(),
    /* @__PURE__ */ jsxRuntime.jsx(
      TranslationCreateEditModal,
      {
        ref: translationCreatedEditModalRef,
        namespaceId: null,
        projectId,
        refetch: handleRefetch
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(
      ConfirmModal,
      {
        ref: confirmDeleteModalRef,
        onCancel: handleToggleDeleteTranslation(),
        onConfirm: handleDeleteConfirm,
        text: `Are you sure you want to delete "${selectedDeleteTranslation?.key}"? This action cannot be undone.`,
        title: "Delete translation"
      }
    )
  ] });
};
const { get } = admin.getFetchClient();
const getProject = async (id) => {
  return get(`/${index.PLUGIN_ID}/api/projects/${id}`).then((res) => res.data);
};
const ProjectTranslationsPage = () => {
  const params = reactRouterDom.useParams();
  const { projectId } = params;
  const [project, setProject] = react.useState(null);
  react.useEffect(() => {
    const fetchProject = async () => {
      if (projectId) {
        const data = await getProject(projectId);
        setProject(data);
      }
    };
    fetchProject();
  }, [projectId]);
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Main, { padding: "2rem", children: [
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Box, { paddingBottom: "1rem", children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { paddingBottom: "0.5rem", gap: "1rem", children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "alpha", children: "Static translations" }) }),
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Breadcrumbs, { label: "Folder navigatation", children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.CrumbLink, { href: `/admin/plugins/${index.PLUGIN_ID}`, children: "Projects" }),
        /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Crumb, { isCurrent: true, children: [
          "All translations ",
          project ? ` - ${project.name}` : ""
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { padding: "1rem", children: /* @__PURE__ */ jsxRuntime.jsx(ProjectTranslations, {}) })
  ] });
};
const App = () => {
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.DesignSystemProvider, { locale: "en-GB", theme: designSystem.darkTheme, children: /* @__PURE__ */ jsxRuntime.jsxs(reactRouterDom.Routes, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(reactRouterDom.Route, { index: true, path: "/", element: /* @__PURE__ */ jsxRuntime.jsx(ProjectsPage, {}) }),
    /* @__PURE__ */ jsxRuntime.jsx(reactRouterDom.Route, { index: true, path: "/projects/:projectId", element: /* @__PURE__ */ jsxRuntime.jsx(NamespacesPage, {}) }),
    /* @__PURE__ */ jsxRuntime.jsx(
      reactRouterDom.Route,
      {
        index: true,
        path: "/projects/:projectId/translations",
        element: /* @__PURE__ */ jsxRuntime.jsx(ProjectTranslationsPage, {})
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(
      reactRouterDom.Route,
      {
        index: true,
        path: "/projects/:projectId/namespaces/:namespaceId",
        element: /* @__PURE__ */ jsxRuntime.jsx(TranslationsPage, {})
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(reactRouterDom.Route, { path: "*", element: /* @__PURE__ */ jsxRuntime.jsx(admin.Page.Error, {}) })
  ] }) });
};
exports.default = App;
