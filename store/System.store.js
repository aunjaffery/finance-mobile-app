const SystemStore = (set, _) => ({
  darkMode: true,
  loading: false,
  changeTheme: (theme) => set({ darkMode: theme === "dark" ? true : false }),
  logger: (theme) => console.log("called", theme),
});

export default SystemStore;
