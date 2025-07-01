export function MobileToggle({
    sidebarOpen,
    toggleSidebar,
  }: {
    sidebarOpen: boolean;
    toggleSidebar: () => void;
  }) {
    return (
      <div className="flex justify-between items-center p-4 md:hidden">
        <h1 className="text-lg font-bold">Translator</h1>
        <button
          onClick={toggleSidebar}
          className="px-3 py-1 bg-amber-400 text-white rounded"
        >
          {sidebarOpen ? "Close History" : "Show History"}
        </button>
      </div>
    );
  }
  