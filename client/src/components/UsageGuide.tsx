export default function UsageGuide() {
  return (
    <div className="mt-4 bg-white rounded-lg shadow-sm p-4">
      <h3 className="font-google-sans font-medium mb-2">How to Use</h3>
      <ol className="text-sm space-y-2 text-gray-600">
        <li className="flex">
          <span className="inline-flex items-center justify-center rounded-full bg-blue-600 text-white h-5 w-5 text-xs mr-2 flex-shrink-0">1</span>
          <span>Paste your HTML code in the editor on the left</span>
        </li>
        <li className="flex">
          <span className="inline-flex items-center justify-center rounded-full bg-blue-600 text-white h-5 w-5 text-xs mr-2 flex-shrink-0">2</span>
          <span>Preview how it will look in Gmail compose</span>
        </li>
        <li className="flex">
          <span className="inline-flex items-center justify-center rounded-full bg-blue-600 text-white h-5 w-5 text-xs mr-2 flex-shrink-0">3</span>
          <span>Click "Copy for Gmail" to copy the formatted HTML</span>
        </li>
        <li className="flex">
          <span className="inline-flex items-center justify-center rounded-full bg-blue-600 text-white h-5 w-5 text-xs mr-2 flex-shrink-0">4</span>
          <span>In Gmail compose, press Ctrl+V or right-click and select Paste</span>
        </li>
      </ol>
    </div>
  );
}
