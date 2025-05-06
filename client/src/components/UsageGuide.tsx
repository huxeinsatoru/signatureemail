export default function UsageGuide() {
  return (
    <div className="mt-4 bg-white rounded-lg shadow-sm p-4">
      <h3 className="font-google-sans font-medium mb-2">How to Add Your Signature in Gmail</h3>
      <ol className="text-sm space-y-2 text-gray-600">
        <li className="flex">
          <span className="inline-flex items-center justify-center rounded-full bg-blue-600 text-white h-5 w-5 text-xs mr-2 flex-shrink-0">1</span>
          <span>Customize your signature using the form or HTML editor</span>
        </li>
        <li className="flex">
          <span className="inline-flex items-center justify-center rounded-full bg-blue-600 text-white h-5 w-5 text-xs mr-2 flex-shrink-0">2</span>
          <span>Click "Copy for Gmail" to copy the signature</span>
        </li>
        <li className="flex">
          <span className="inline-flex items-center justify-center rounded-full bg-blue-600 text-white h-5 w-5 text-xs mr-2 flex-shrink-0">3</span>
          <span>In Gmail, go to Settings then See all settings then Signature</span>
        </li>
        <li className="flex">
          <span className="inline-flex items-center justify-center rounded-full bg-blue-600 text-white h-5 w-5 text-xs mr-2 flex-shrink-0">4</span>
          <span>Paste the signature with Ctrl+V, save changes at the bottom of the page</span>
        </li>
      </ol>
    </div>
  );
}
