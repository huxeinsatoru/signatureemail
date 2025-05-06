import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { CleanupOptions } from "@/lib/htmlTransformer";

interface CleanupOptionsProps {
  options: CleanupOptions;
  onChange: (options: CleanupOptions) => void;
}

export default function CleanupOptionsComponent({ options, onChange }: CleanupOptionsProps) {
  const handleOptionChange = (option: keyof CleanupOptions, checked: boolean) => {
    onChange({
      ...options,
      [option]: checked
    });
  };

  return (
    <div className="mt-4 bg-white rounded-lg shadow-sm p-4">
      <h3 className="font-google-sans font-medium mb-3">Cleanup Options</h3>
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="remove-comments" 
            checked={options.removeComments}
            onCheckedChange={(checked) => 
              handleOptionChange('removeComments', checked === true)
            }
          />
          <Label htmlFor="remove-comments" className="text-sm cursor-pointer">
            Remove HTML comments
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox 
            id="inline-css" 
            checked={options.inlineCss}
            onCheckedChange={(checked) => 
              handleOptionChange('inlineCss', checked === true)
            }
          />
          <Label htmlFor="inline-css" className="text-sm cursor-pointer">
            Convert CSS to inline styles
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox 
            id="remove-scripts" 
            checked={options.removeScripts}
            onCheckedChange={(checked) => 
              handleOptionChange('removeScripts', checked === true)
            }
          />
          <Label htmlFor="remove-scripts" className="text-sm cursor-pointer">
            Remove script tags
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox 
            id="fix-tables" 
            checked={options.fixTables}
            onCheckedChange={(checked) => 
              handleOptionChange('fixTables', checked === true)
            }
          />
          <Label htmlFor="fix-tables" className="text-sm cursor-pointer">
            Fix table layouts for Gmail
          </Label>
        </div>
      </div>
    </div>
  );
}
