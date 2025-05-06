import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SignatureData } from "@/lib/htmlTransformer";
import { Upload } from "lucide-react";

interface SignatureFormProps {
  data: SignatureData;
  onChange: (data: SignatureData) => void;
}

export default function SignatureForm({ data, onChange }: SignatureFormProps) {
  // Handle input changes
  const handleChange = (field: keyof SignatureData, value: string) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  return (
    <div className="w-full lg:w-1/2 bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
        <h3 className="font-google-sans font-medium">Signature Details</h3>
      </div>
      
      <div className="p-4 overflow-auto editor-container">
        <div className="space-y-6">
          {/* Profile Section */}
          <div className="space-y-4">
            <h4 className="font-medium text-sm text-gray-900 border-b pb-2">Profile Information</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  value={data.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="John Doe"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="title">Job Title</Label>
                <Input 
                  id="title" 
                  value={data.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  placeholder="Software Developer"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="profileImageUrl">Profile Image URL</Label>
                <div className="flex">
                  <Input 
                    id="profileImageUrl" 
                    value={data.profileImageUrl}
                    onChange={(e) => handleChange('profileImageUrl', e.target.value)}
                    placeholder="https://example.com/profile.jpg"
                    className="rounded-r-none"
                  />
                  <div className="flex items-center justify-center bg-gray-100 border border-l-0 border-gray-300 rounded-r-md p-2">
                    <Upload className="h-4 w-4 text-gray-500" />
                  </div>
                </div>
                <p className="text-xs text-gray-500">URL to your profile image (80x80px recommended)</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="companyLogoUrl">Company Logo URL</Label>
                <div className="flex">
                  <Input 
                    id="companyLogoUrl" 
                    value={data.companyLogoUrl}
                    onChange={(e) => handleChange('companyLogoUrl', e.target.value)}
                    placeholder="https://example.com/logo.png"
                    className="rounded-r-none"
                  />
                  <div className="flex items-center justify-center bg-gray-100 border border-l-0 border-gray-300 rounded-r-md p-2">
                    <Upload className="h-4 w-4 text-gray-500" />
                  </div>
                </div>
                <p className="text-xs text-gray-500">URL to your company logo (recommended height: 40px)</p>
              </div>
            </div>
          </div>
          
          {/* Contact Section */}
          <div className="space-y-4">
            <h4 className="font-medium text-sm text-gray-900 border-b pb-2">Contact Information</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone" 
                  value={data.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  value={data.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="john.doe@example.com"
                />
              </div>
            </div>
          </div>
          
          {/* Company Section */}
          <div className="space-y-4">
            <h4 className="font-medium text-sm text-gray-900 border-b pb-2">Company Information</h4>
            
            <div className="space-y-2">
              <Label htmlFor="company">Company Name</Label>
              <Input 
                id="company" 
                value={data.company}
                onChange={(e) => handleChange('company', e.target.value)}
                placeholder="Acme Corporation"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Company Address</Label>
              <Input 
                id="address" 
                value={data.address}
                onChange={(e) => handleChange('address', e.target.value)}
                placeholder="123 Business Street, New York, NY 10001"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input 
                  id="website" 
                  value={data.website}
                  onChange={(e) => handleChange('website', e.target.value)}
                  placeholder="example.com"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="companyRegistration">Registration/ID Number</Label>
                <Input 
                  id="companyRegistration" 
                  value={data.companyRegistration}
                  onChange={(e) => handleChange('companyRegistration', e.target.value)}
                  placeholder="Reg. No. 123456789"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}