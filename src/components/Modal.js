function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-xl p-6 m-2">
        <div id="modalHeader" className="shadow border w-full p-2">
          <div className="flex justify-between items-left">
            <h4 className="text-lg font-bold">{title}</h4>
            <button
              onClick={onClose}
              className="text-gray-700 font-semibold hover:text-gray-900 w-2"
            >
              X
            </button>
          </div>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  )
}

export default Modal
