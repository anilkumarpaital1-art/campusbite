import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function SwitchCartModal() {

  const {
    showSwitchModal,
    handleConfirmSwitch,
    handleCancelSwitch,
    pendingItem
  } = useContext(AppContext);

  if (!showSwitchModal || !pendingItem) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

      {/* MODAL BOX */}
      <div className="bg-white w-[90%] max-w-md rounded-2xl shadow-2xl p-6 animate-scaleIn">

        {/* TITLE */}
        <h2 className="text-xl font-semibold mb-2">
          Switch Cart?
        </h2>

        {/* MESSAGE */}
        <p className="text-gray-600 text-sm mb-4">
          Your cart contains items from another restaurant.
        </p>

        <p className="text-red-600 font-medium mb-6">
          Do you want to switch to this restaurant?
        </p>

        {/* ACTIONS */}
        <div className="flex justify-end gap-3">

          <button
            onClick={handleCancelSwitch}
            className="px-4 py-2 rounded-lg border hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleConfirmSwitch}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Switch
          </button>

        </div>

      </div>
    </div>
  );
}