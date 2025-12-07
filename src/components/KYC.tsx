import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Progress } from './ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Logo } from './Logo';
import { 
  ArrowLeft, 
  ArrowRight,
  Upload, 
  CheckCircle2, 
  FileText, 
  MapPin, 
  Smartphone, 
  User,
  Camera,
  Shield,
  Clock,
  Building,
  Wallet,
  AlertCircle,
  Sparkles,
  Lock,
  CheckCircle,
  Info,
  FileCheck,
  TrendingUp,
  Zap,
  Star,
  ShieldCheck,
  CreditCard,
  Eye,
  Globe,
  Award,
  Target,
  BarChart3,
  Fingerprint,
  Verified,
  CircleDot,
} from 'lucide-react';

interface KYCProps {
  onComplete: () => void;
  onBack?: () => void;
}

export function KYC({ onComplete, onBack }: KYCProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Personal Info
    fullName: '',
    dateOfBirth: '',
    gender: '',
    fatherName: '',
    motherName: '',
    maritalStatus: '',
    nationality: 'Indian',
    
    // Step 2: Contact Info
    email: '',
    mobile: '',
    alternateMobile: '',
    whatsappNumber: '',
    
    // Step 3: Address Details
    address: '',
    city: '',
    state: '',
    pincode: '',
    addressType: '',
    addressProof: null as File | null,
    
    // Step 4: ID Documents
    aadharFile: null as File | null,
    aadharNumber: '',
    panFile: null as File | null,
    panNumber: '',
    
    // Step 5: Financial Details
    annualIncome: '',
    occupation: '',
    tradingExperience: '',
    investmentObjective: '',
    riskAppetite: '',
    
    // Step 6: Bank Details
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    accountType: '',
    bankProof: null as File | null,
    
    // Step 7: Photo & Signature
    photoFile: null as File | null,
    signatureFile: null as File | null,
    otp: '',
  });

  const totalSteps = 7;
  const progress = (step / totalSteps) * 100;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, [field]: e.target.files[0] });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  const stepConfig = [
    { 
      icon: User, 
      title: 'Personal Details', 
      description: 'Basic information to verify your identity',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-500/10 to-cyan-500/10',
      borderColor: 'border-blue-500/30',
      iconColor: 'text-blue-500'
    },
    { 
      icon: Smartphone, 
      title: 'Contact Information', 
      description: 'Secure communication channels',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-500/10 to-pink-500/10',
      borderColor: 'border-purple-500/30',
      iconColor: 'text-purple-500'
    },
    { 
      icon: MapPin, 
      title: 'Address Verification', 
      description: 'Residential proof for compliance',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-500/10 to-emerald-500/10',
      borderColor: 'border-green-500/30',
      iconColor: 'text-green-500'
    },
    { 
      icon: FileText, 
      title: 'Identity Documents', 
      description: 'Government-issued ID verification',
      color: 'from-orange-500 to-red-500',
      bgColor: 'from-orange-500/10 to-red-500/10',
      borderColor: 'border-orange-500/30',
      iconColor: 'text-orange-500'
    },
    { 
      icon: TrendingUp, 
      title: 'Financial Profile', 
      description: 'Investment goals and risk assessment',
      color: 'from-theme-primary to-yellow-500',
      bgColor: 'from-theme-primary/10 to-yellow-500/10',
      borderColor: 'border-theme-primary/30',
      iconColor: 'text-theme-primary'
    },
    { 
      icon: Building, 
      title: 'Bank Linking', 
      description: 'Secure fund transfers and settlements',
      color: 'from-indigo-500 to-blue-500',
      bgColor: 'from-indigo-500/10 to-blue-500/10',
      borderColor: 'border-indigo-500/30',
      iconColor: 'text-indigo-500'
    },
    { 
      icon: Camera, 
      title: 'Final Verification', 
      description: 'Photo and digital signature capture',
      color: 'from-pink-500 to-rose-500',
      bgColor: 'from-pink-500/10 to-rose-500/10',
      borderColor: 'border-pink-500/30',
      iconColor: 'text-pink-500'
    },
  ];

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            {/* Step Title */}
            <div className="space-y-2">
              <h3 className="text-2xl">Personal Details</h3>
              <p className="text-muted-foreground">
                Please provide your basic information exactly as it appears on your government-issued documents. This ensures seamless verification and compliance with SEBI regulations.
              </p>
            </div>

            {/* Info Banner */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-blue-500/10 border border-blue-500/20">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="text-foreground mb-1">Enter details as per PAN card</p>
                  <p className="text-muted-foreground text-xs">All fields marked with * are mandatory for account creation</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="fullName" className="text-sm flex items-center gap-1">
                  Full Legal Name <span className="text-red-500">*</span>
                  <span className="text-xs text-muted-foreground ml-1">(as per PAN card)</span>
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="e.g. Rajesh Kumar Singh"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="rounded-xl border-border/50 focus:border-theme-primary focus:ring-theme-primary/20 bg-background/50 h-12 transition-all"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateOfBirth" className="text-sm flex items-center gap-1">
                  Date of Birth <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="rounded-xl border-border/50 focus:border-theme-primary focus:ring-theme-primary/20 bg-background/50 h-12 transition-all"
                  required
                />
                <p className="text-xs text-muted-foreground">Must be 18 years or older to trade</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender" className="text-sm flex items-center gap-1">
                  Gender <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.gender} onValueChange={(value) => handleSelectChange('gender', value)}>
                  <SelectTrigger className="rounded-xl border-border/50 h-12 bg-background/50">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="maritalStatus" className="text-sm flex items-center gap-1">
                  Marital Status <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.maritalStatus} onValueChange={(value) => handleSelectChange('maritalStatus', value)}>
                  <SelectTrigger className="rounded-xl border-border/50 h-12 bg-background/50">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single</SelectItem>
                    <SelectItem value="married">Married</SelectItem>
                    <SelectItem value="divorced">Divorced</SelectItem>
                    <SelectItem value="widowed">Widowed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="nationality" className="text-sm flex items-center gap-1">
                  Nationality <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="nationality"
                  type="text"
                  value={formData.nationality}
                  onChange={handleChange}
                  className="rounded-xl border-border/50 focus:border-theme-primary focus:ring-theme-primary/20 bg-background/50 h-12 transition-all"
                  readOnly
                />
                <p className="text-xs text-muted-foreground">Only Indian residents can currently apply</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fatherName" className="text-sm flex items-center gap-1">
                  Father's Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="fatherName"
                  type="text"
                  placeholder="Enter father's full name"
                  value={formData.fatherName}
                  onChange={handleChange}
                  className="rounded-xl border-border/50 focus:border-theme-primary focus:ring-theme-primary/20 bg-background/50 h-12 transition-all"
                  required
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="motherName" className="text-sm flex items-center gap-1">
                  Mother's Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="motherName"
                  type="text"
                  placeholder="Enter mother's full name"
                  value={formData.motherName}
                  onChange={handleChange}
                  className="rounded-xl border-border/50 focus:border-theme-primary focus:ring-theme-primary/20 bg-background/50 h-12 transition-all"
                  required
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            {/* Step Title */}
            <div className="space-y-2">
              <h3 className="text-2xl">Contact Information</h3>
              <p className="text-muted-foreground">
                Your contact details will be used for OTP verification, trade confirmations, account alerts, and important market updates. We ensure your information remains secure and private.
              </p>
            </div>

            {/* Info Banner */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 border border-purple-500/20">
              <div className="flex items-start gap-3">
                <Smartphone className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="text-foreground mb-1">Verify your mobile and email</p>
                  <p className="text-muted-foreground text-xs">We'll send OTP for instant verification of your contact details</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm flex items-center gap-1">
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="rounded-xl border-border/50 focus:border-theme-primary focus:ring-theme-primary/20 bg-background/50 h-12 transition-all"
                  required
                />
                <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                  Trade confirmations, reports, and account statements will be sent here
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="mobile" className="text-sm flex items-center gap-1">
                  Primary Mobile Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="mobile"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="rounded-xl border-border/50 focus:border-theme-primary focus:ring-theme-primary/20 bg-background/50 h-12 transition-all"
                  required
                />
                <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-theme-primary" />
                  Used for 2FA authentication and instant trade alerts
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="whatsappNumber" className="text-sm flex items-center gap-1">
                    WhatsApp Number
                    <Badge variant="secondary" className="ml-2 text-xs">Optional</Badge>
                  </Label>
                  <Input
                    id="whatsappNumber"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.whatsappNumber}
                    onChange={handleChange}
                    className="rounded-xl border-border/50 focus:border-theme-primary focus:ring-theme-primary/20 bg-background/50 h-12 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="alternateMobile" className="text-sm flex items-center gap-1">
                    Alternate Mobile
                    <Badge variant="secondary" className="ml-2 text-xs">Optional</Badge>
                  </Label>
                  <Input
                    id="alternateMobile"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.alternateMobile}
                    onChange={handleChange}
                    className="rounded-xl border-border/50 focus:border-theme-primary focus:ring-theme-primary/20 bg-background/50 h-12 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Benefits Grid */}
            <div className="grid md:grid-cols-3 gap-3 mt-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-foreground">Instant Alerts</span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  <span className="text-sm text-foreground">Secure 2FA</span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-br from-theme-primary/10 to-yellow-500/10 border border-theme-primary/20">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-theme-primary flex-shrink-0" />
                  <span className="text-sm text-foreground">Real-time Updates</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            {/* Step Title */}
            <div className="space-y-2">
              <h3 className="text-2xl">Address Verification</h3>
              <p className="text-muted-foreground">
                Provide your current residential address for compliance with KYC regulations. Your address must match the proof documents you submit and should not be older than 3 months.
              </p>
            </div>

            {/* Info Banner */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-green-500/10 border border-green-500/20">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="text-foreground mb-1">Enter your permanent residential address</p>
                  <p className="text-muted-foreground text-xs">This must match your address proof documents</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="address" className="text-sm flex items-center gap-1">
                  Complete Residential Address <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="address"
                  placeholder="House No., Building Name, Street Name, Locality"
                  value={formData.address}
                  onChange={handleChange}
                  className="rounded-xl border-border/50 focus:border-theme-primary focus:ring-theme-primary/20 bg-background/50 min-h-[100px] resize-none transition-all"
                  required
                />
                <p className="text-xs text-muted-foreground">Include all details for accurate verification</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-sm flex items-center gap-1">
                    City <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="city"
                    type="text"
                    placeholder="e.g. Mumbai"
                    value={formData.city}
                    onChange={handleChange}
                    className="rounded-xl border-border/50 focus:border-theme-primary focus:ring-theme-primary/20 bg-background/50 h-12 transition-all"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state" className="text-sm flex items-center gap-1">
                    State / UT <span className="text-red-500">*</span>
                  </Label>
                  <Select value={formData.state} onValueChange={(value) => handleSelectChange('state', value)}>
                    <SelectTrigger className="rounded-xl border-border/50 h-12 bg-background/50">
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="maharashtra">Maharashtra</SelectItem>
                      <SelectItem value="delhi">Delhi</SelectItem>
                      <SelectItem value="karnataka">Karnataka</SelectItem>
                      <SelectItem value="tamil-nadu">Tamil Nadu</SelectItem>
                      <SelectItem value="gujarat">Gujarat</SelectItem>
                      <SelectItem value="west-bengal">West Bengal</SelectItem>
                      <SelectItem value="rajasthan">Rajasthan</SelectItem>
                      <SelectItem value="punjab">Punjab</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pincode" className="text-sm flex items-center gap-1">
                    PIN Code <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="pincode"
                    type="text"
                    placeholder="400001"
                    value={formData.pincode}
                    onChange={handleChange}
                    className="rounded-xl border-border/50 focus:border-theme-primary focus:ring-theme-primary/20 bg-background/50 h-12 transition-all"
                    maxLength={6}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="addressType" className="text-sm flex items-center gap-1">
                  Address Type <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.addressType} onValueChange={(value) => handleSelectChange('addressType', value)}>
                  <SelectTrigger className="rounded-xl border-border/50 h-12 bg-background/50">
                    <SelectValue placeholder="Select address type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="owned">Owned</SelectItem>
                    <SelectItem value="rented">Rented</SelectItem>
                    <SelectItem value="parental">Parental</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="addressProof" className="text-sm flex items-center gap-1">
                  Address Proof Document <span className="text-red-500">*</span>
                  <Badge variant="secondary" className="ml-2 text-xs">PDF or Image</Badge>
                </Label>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-theme-primary/20 to-green-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative">
                    <Input
                      id="addressProof"
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => handleFileChange(e, 'addressProof')}
                      className="rounded-xl border-border/50 focus:border-theme-primary focus:ring-theme-primary/20 bg-background/50 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-theme-primary/20 file:text-theme-primary file:transition-all file:hover:bg-theme-primary/30"
                    />
                    {formData.addressProof && (
                      <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                    )}
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-muted/50 mt-2">
                  <p className="text-xs text-muted-foreground mb-1">Accepted Documents:</p>
                  <ul className="text-xs text-muted-foreground space-y-0.5 ml-4">
                    <li>• Electricity / Water / Gas Bill (not older than 3 months)</li>
                    <li>• Bank Account Statement with address</li>
                    <li>• Rent Agreement with owner details</li>
                    <li>• Aadhaar Card with current address</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            {/* Step Title */}
            <div className="space-y-2">
              <h3 className="text-2xl">Identity Documents</h3>
              <p className="text-muted-foreground">
                Upload clear, readable copies of your government-issued identification documents. We use bank-grade 256-bit encryption to protect your sensitive information and ensure complete data security.
              </p>
            </div>

            {/* Info Banner */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-orange-500/10 via-red-500/10 to-orange-500/10 border border-orange-500/20">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="text-foreground mb-1">Secure document upload</p>
                  <p className="text-muted-foreground text-xs">Your documents are encrypted and stored securely in compliance with RBI & SEBI guidelines</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {/* Aadhaar Card */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/5 to-pink-500/5 border border-purple-500/20">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg mb-0.5">Aadhaar Card</h4>
                    <p className="text-sm text-muted-foreground">Unique Identification Authority of India (UIDAI)</p>
                  </div>
                  <Badge className="bg-purple-500/20 text-purple-500 border-purple-500/30">
                    Mandatory
                  </Badge>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="aadharNumber" className="text-sm flex items-center gap-1">
                      12-digit Aadhaar Number <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="aadharNumber"
                      type="text"
                      placeholder="XXXX XXXX XXXX"
                      value={formData.aadharNumber}
                      onChange={handleChange}
                      className="rounded-xl border-border/50 focus:border-purple-500 focus:ring-purple-500/20 bg-background/50 h-12 transition-all"
                      maxLength={12}
                      required
                    />
                    <p className="text-xs text-muted-foreground">Enter without spaces</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="aadhar" className="text-sm flex items-center gap-1">
                      Upload Aadhaar Copy <span className="text-red-500">*</span>
                      <Badge variant="secondary" className="ml-2 text-xs">Front & Back</Badge>
                    </Label>
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="relative">
                        <Input
                          id="aadhar"
                          type="file"
                          accept="image/*,.pdf"
                          onChange={(e) => handleFileChange(e, 'aadharFile')}
                          className="rounded-xl border-border/50 focus:border-purple-500 focus:ring-purple-500/20 bg-background/50 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-500/20 file:text-purple-500 file:transition-all file:hover:bg-purple-500/30"
                        />
                        {formData.aadharFile && (
                          <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">Upload both sides clearly. Masked Aadhaar is accepted.</p>
                  </div>
                </div>
              </div>

              {/* PAN Card */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/5 to-cyan-500/5 border border-blue-500/20">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg mb-0.5">PAN Card</h4>
                    <p className="text-sm text-muted-foreground">Permanent Account Number - Income Tax Department</p>
                  </div>
                  <Badge className="bg-blue-500/20 text-blue-500 border-blue-500/30">
                    Mandatory
                  </Badge>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="panNumber" className="text-sm flex items-center gap-1">
                      10-character PAN Number <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="panNumber"
                      type="text"
                      placeholder="ABCDE1234F"
                      value={formData.panNumber}
                      onChange={handleChange}
                      className="rounded-xl border-border/50 focus:border-blue-500 focus:ring-blue-500/20 bg-background/50 h-12 transition-all uppercase"
                      maxLength={10}
                      required
                    />
                    <p className="text-xs text-muted-foreground">PAN is mandatory for all financial transactions</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pan" className="text-sm flex items-center gap-1">
                      Upload PAN Card Copy <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="relative">
                        <Input
                          id="pan"
                          type="file"
                          accept="image/*,.pdf"
                          onChange={(e) => handleFileChange(e, 'panFile')}
                          className="rounded-xl border-border/50 focus:border-blue-500 focus:ring-blue-500/20 bg-background/50 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-500/20 file:text-blue-500 file:transition-all file:hover:bg-blue-500/30"
                        />
                        {formData.panFile && (
                          <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">Clear photo or scan of your PAN card</p>
                  </div>
                </div>
              </div>

              {/* Security Notice */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20">
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="text-foreground">Your documents are secure</p>
                    <p className="text-muted-foreground text-xs">256-bit SSL encryption • SEBI compliant • Never shared with third parties</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            {/* Step Title */}
            <div className="space-y-2">
              <h3 className="text-2xl">Financial Profile</h3>
              <p className="text-muted-foreground">
                Help us understand your investment goals and risk tolerance. This information allows us to provide personalized recommendations and ensures compliance with SEBI's investor protection guidelines.
              </p>
            </div>

            {/* Info Banner */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-theme-primary/10 via-yellow-500/10 to-theme-primary/10 border border-theme-primary/20">
              <div className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-theme-primary flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="text-foreground mb-1">Customize your trading experience</p>
                  <p className="text-muted-foreground text-xs">This helps us recommend suitable investment products and risk levels</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="annualIncome" className="text-sm flex items-center gap-1">
                    Annual Income <span className="text-red-500">*</span>
                  </Label>
                  <Select value={formData.annualIncome} onValueChange={(value) => handleSelectChange('annualIncome', value)}>
                    <SelectTrigger className="rounded-xl border-border/50 h-12 bg-background/50">
                      <SelectValue placeholder="Select income range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="below-1l">Below ₹1 Lakh</SelectItem>
                      <SelectItem value="1l-5l">₹1-5 Lakhs</SelectItem>
                      <SelectItem value="5l-10l">₹5-10 Lakhs</SelectItem>
                      <SelectItem value="10l-25l">₹10-25 Lakhs</SelectItem>
                      <SelectItem value="25l-1cr">₹25 Lakhs - ₹1 Crore</SelectItem>
                      <SelectItem value="above-1cr">Above ₹1 Crore</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="occupation" className="text-sm flex items-center gap-1">
                    Occupation <span className="text-red-500">*</span>
                  </Label>
                  <Select value={formData.occupation} onValueChange={(value) => handleSelectChange('occupation', value)}>
                    <SelectTrigger className="rounded-xl border-border/50 h-12 bg-background/50">
                      <SelectValue placeholder="Select occupation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="salaried">Salaried</SelectItem>
                      <SelectItem value="self-employed">Self Employed</SelectItem>
                      <SelectItem value="business">Business Owner</SelectItem>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="retired">Retired</SelectItem>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tradingExperience" className="text-sm flex items-center gap-1">
                  Trading Experience <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.tradingExperience} onValueChange={(value) => handleSelectChange('tradingExperience', value)}>
                  <SelectTrigger className="rounded-xl border-border/50 h-12 bg-background/50">
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner (Never traded)</SelectItem>
                    <SelectItem value="basic">Basic (Less than 1 year)</SelectItem>
                    <SelectItem value="intermediate">Intermediate (1-3 years)</SelectItem>
                    <SelectItem value="experienced">Experienced (3-5 years)</SelectItem>
                    <SelectItem value="expert">Expert (5+ years)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="investmentObjective" className="text-sm flex items-center gap-1">
                  Primary Investment Objective <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.investmentObjective} onValueChange={(value) => handleSelectChange('investmentObjective', value)}>
                  <SelectTrigger className="rounded-xl border-border/50 h-12 bg-background/50">
                    <SelectValue placeholder="Select investment goal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wealth-creation">Long-term Wealth Creation</SelectItem>
                    <SelectItem value="regular-income">Regular Income Generation</SelectItem>
                    <SelectItem value="capital-appreciation">Capital Appreciation</SelectItem>
                    <SelectItem value="short-term-gains">Short-term Gains</SelectItem>
                    <SelectItem value="speculation">Speculation & Day Trading</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="riskAppetite" className="text-sm flex items-center gap-1">
                  Risk Appetite <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.riskAppetite} onValueChange={(value) => handleSelectChange('riskAppetite', value)}>
                  <SelectTrigger className="rounded-xl border-border/50 h-12 bg-background/50">
                    <SelectValue placeholder="Select risk level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="conservative">Conservative (Low Risk)</SelectItem>
                    <SelectItem value="moderate">Moderate (Balanced Risk)</SelectItem>
                    <SelectItem value="aggressive">Aggressive (High Risk)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Higher risk can lead to higher returns but also potential losses
                </p>
              </div>

              {/* Risk Explanation Cards */}
              <div className="grid md:grid-cols-3 gap-3 mt-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Conservative</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Stable returns, low volatility</p>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-gradient-to-br from-theme-primary/10 to-yellow-500/10 border border-theme-primary/20">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-theme-primary" />
                      <span className="text-sm">Moderate</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Balanced growth potential</p>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-orange-500" />
                      <span className="text-sm">Aggressive</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Maximum returns, higher risk</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            {/* Step Title */}
            <div className="space-y-2">
              <h3 className="text-2xl">Bank Account Linking</h3>
              <p className="text-muted-foreground">
                Link your bank account for seamless fund transfers and instant settlements. Your bank details are stored securely and used only for trading transactions. We support all major Indian banks with NEFT/RTGS/IMPS capabilities.
              </p>
            </div>

            {/* Info Banner */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-500/10 via-blue-500/10 to-indigo-500/10 border border-indigo-500/20">
              <div className="flex items-start gap-3">
                <Building className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="text-foreground mb-1">Connect your primary bank account</p>
                  <p className="text-muted-foreground text-xs">This account will be used for deposits, withdrawals, and trade settlements</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="bankName" className="text-sm flex items-center gap-1">
                  Bank Name <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.bankName} onValueChange={(value) => handleSelectChange('bankName', value)}>
                  <SelectTrigger className="rounded-xl border-border/50 h-12 bg-background/50">
                    <SelectValue placeholder="Select your bank" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hdfc">HDFC Bank</SelectItem>
                    <SelectItem value="icici">ICICI Bank</SelectItem>
                    <SelectItem value="sbi">State Bank of India</SelectItem>
                    <SelectItem value="axis">Axis Bank</SelectItem>
                    <SelectItem value="kotak">Kotak Mahindra Bank</SelectItem>
                    <SelectItem value="pnb">Punjab National Bank</SelectItem>
                    <SelectItem value="bob">Bank of Baroda</SelectItem>
                    <SelectItem value="yes">Yes Bank</SelectItem>
                    <SelectItem value="idfc">IDFC First Bank</SelectItem>
                    <SelectItem value="other">Other Bank</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="accountNumber" className="text-sm flex items-center gap-1">
                    Bank Account Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="accountNumber"
                    type="text"
                    placeholder="Enter account number"
                    value={formData.accountNumber}
                    onChange={handleChange}
                    className="rounded-xl border-border/50 focus:border-theme-primary focus:ring-theme-primary/20 bg-background/50 h-12 transition-all"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ifscCode" className="text-sm flex items-center gap-1">
                    IFSC Code <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="ifscCode"
                    type="text"
                    placeholder="e.g. HDFC0001234"
                    value={formData.ifscCode}
                    onChange={handleChange}
                    className="rounded-xl border-border/50 focus:border-theme-primary focus:ring-theme-primary/20 bg-background/50 h-12 transition-all uppercase"
                    maxLength={11}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="accountType" className="text-sm flex items-center gap-1">
                  Account Type <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.accountType} onValueChange={(value) => handleSelectChange('accountType', value)}>
                  <SelectTrigger className="rounded-xl border-border/50 h-12 bg-background/50">
                    <SelectValue placeholder="Select account type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="savings">Savings Account</SelectItem>
                    <SelectItem value="current">Current Account</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bankProof" className="text-sm flex items-center gap-1">
                  Bank Proof Document <span className="text-red-500">*</span>
                  <Badge variant="secondary" className="ml-2 text-xs">Cancelled Cheque / Statement</Badge>
                </Label>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-theme-primary/20 to-indigo-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative">
                    <Input
                      id="bankProof"
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => handleFileChange(e, 'bankProof')}
                      className="rounded-xl border-border/50 focus:border-theme-primary focus:ring-theme-primary/20 bg-background/50 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-500/20 file:text-indigo-500 file:transition-all file:hover:bg-indigo-500/30"
                    />
                    {formData.bankProof && (
                      <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                    )}
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-muted/50 mt-2">
                  <p className="text-xs text-muted-foreground mb-1">Upload any one of the following:</p>
                  <ul className="text-xs text-muted-foreground space-y-0.5 ml-4">
                    <li>• Cancelled cheque with your name printed</li>
                    <li>• Bank statement (first page with account details)</li>
                    <li>• Bank passbook copy</li>
                  </ul>
                </div>
              </div>

              {/* Bank Benefits */}
              <div className="grid md:grid-cols-3 gap-3 mt-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm">Instant Transfers</span>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-blue-500 flex-shrink-0" />
                    <span className="text-sm">Secure Payments</span>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-gradient-to-br from-theme-primary/10 to-yellow-500/10 border border-theme-primary/20">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-theme-primary flex-shrink-0" />
                    <span className="text-sm">Auto Settlement</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            {/* Step Title */}
            <div className="space-y-2">
              <h3 className="text-2xl">Final Verification</h3>
              <p className="text-muted-foreground">
                Complete your identity verification with a live photo and digital signature. This is the final step to activate your ZONIX trading account and start investing in the heartbeat of Bharat.
              </p>
            </div>

            {/* Info Banner */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-pink-500/10 via-rose-500/10 to-pink-500/10 border border-pink-500/20">
              <div className="flex items-start gap-3">
                <Camera className="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="text-foreground mb-1">Photo and signature verification</p>
                  <p className="text-muted-foreground text-xs">Take a clear photo and provide your digital signature to complete KYC</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {/* Photo Upload */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/5 to-cyan-500/5 border border-blue-500/20">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                    <User className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg mb-0.5">Live Photograph</h4>
                    <p className="text-sm text-muted-foreground">Recent passport-size photo</p>
                  </div>
                  <Badge className="bg-blue-500/20 text-blue-500 border-blue-500/30">
                    Required
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="photo" className="text-sm flex items-center gap-1">
                    Upload Your Photo <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative">
                      <Input
                        id="photo"
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, 'photoFile')}
                        className="rounded-xl border-border/50 focus:border-blue-500 focus:ring-blue-500/20 bg-background/50 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-500/20 file:text-blue-500 file:transition-all file:hover:bg-blue-500/30"
                      />
                      {formData.photoFile && (
                        <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                      )}
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50 mt-2">
                    <p className="text-xs text-muted-foreground mb-1">Photo Guidelines:</p>
                    <ul className="text-xs text-muted-foreground space-y-0.5 ml-4">
                      <li>• Clear, recent photo (not older than 6 months)</li>
                      <li>• Plain white or light-colored background</li>
                      <li>• Face should be clearly visible (no sunglasses or hats)</li>
                      <li>• Size: Min 10KB, Max 1MB • Format: JPG, PNG</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Signature Upload */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/5 to-pink-500/5 border border-purple-500/20">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                    <FileCheck className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg mb-0.5">Digital Signature</h4>
                    <p className="text-sm text-muted-foreground">Your authorized signature</p>
                  </div>
                  <Badge className="bg-purple-500/20 text-purple-500 border-purple-500/30">
                    Required
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="signature" className="text-sm flex items-center gap-1">
                    Upload Your Signature <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative">
                      <Input
                        id="signature"
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, 'signatureFile')}
                        className="rounded-xl border-border/50 focus:border-purple-500 focus:ring-purple-500/20 bg-background/50 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-500/20 file:text-purple-500 file:transition-all file:hover:bg-purple-500/30"
                      />
                      {formData.signatureFile && (
                        <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                      )}
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50 mt-2">
                    <p className="text-xs text-muted-foreground mb-1">Signature Guidelines:</p>
                    <ul className="text-xs text-muted-foreground space-y-0.5 ml-4">
                      <li>• Sign on white paper with black/blue pen</li>
                      <li>• Signature should match your bank records</li>
                      <li>• Scan or take a clear photo</li>
                      <li>• Size: Min 10KB, Max 200KB • Format: JPG, PNG</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Final Consent */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-theme-primary/5 to-yellow-500/5 border border-theme-primary/20">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Verified className="w-6 h-6 text-theme-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-lg mb-2">Declaration & Consent</h4>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <p>I hereby declare that:</p>
                        <ul className="space-y-1 ml-4">
                          <li>• All information provided is true and accurate</li>
                          <li>• I have read and agree to ZONIX Terms & Conditions</li>
                          <li>• I understand the risks involved in trading</li>
                          <li>• I consent to SEBI regulations and compliance</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Success Message */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="text-foreground">Almost done! Click "Complete KYC" to finalize your account</p>
                    <p className="text-muted-foreground text-xs">Your account will be activated within 24 hours after verification</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-full bg-background flex">
      {/* Left Panel - Branding & Info */}
      <div className="hidden lg:flex lg:w-[45%] xl:w-[40%] bg-gradient-to-br from-theme-primary/5 via-background to-theme-primary/5 border-r border-border/50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        {/* Animated Gradient Orbs */}
        <motion.div
          className="absolute top-20 -left-20 w-96 h-96 bg-theme-primary/20 rounded-full blur-[120px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 -right-20 w-96 h-96 bg-yellow-500/20 rounded-full blur-[120px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col p-12 w-full">
          {/* Logo & Back */}
          <div className="flex items-center justify-between mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Logo />
            </motion.div>
            {onBack && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            )}
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col justify-center space-y-12">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <Badge className="bg-theme-primary/20 text-theme-primary border-theme-primary/30 px-4 py-1.5">
                <Sparkles className="w-3 h-3 mr-1.5" />
                SEBI Compliant KYC
              </Badge>
              <h1 className="text-4xl xl:text-5xl">
                Welcome to
                <span className="block mt-2 bg-gradient-to-r from-theme-primary via-yellow-500 to-theme-primary bg-clip-text text-transparent">
                  The Future of Trading
                </span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Complete your KYC verification to unlock India's first district-based trading platform. Invest in the economic growth of states and districts across Bharat.
              </p>
            </motion.div>

            {/* Step Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-3"
            >
              <div className="flex items-center justify-between text-sm mb-3">
                <span className="text-muted-foreground">Verification Progress</span>
                <span className="text-foreground">Step {step} of {totalSteps}</span>
              </div>
              <Progress value={progress} className="h-2 bg-muted" />
              
              <div className="grid grid-cols-1 gap-3 mt-6">
                {stepConfig.map((config, index) => {
                  const StepIcon = config.icon;
                  const stepNumber = index + 1;
                  const isCompleted = stepNumber < step;
                  const isCurrent = stepNumber === step;
                  const isPending = stepNumber > step;
                  
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + (index * 0.05) }}
                      className={`
                        flex items-center gap-4 p-4 rounded-xl border transition-all
                        ${isCurrent 
                          ? `bg-gradient-to-r ${config.bgColor} ${config.borderColor} border-2` 
                          : isCompleted
                            ? 'bg-green-500/5 border-green-500/20'
                            : 'bg-muted/30 border-border/30'
                        }
                      `}
                    >
                      <div className={`
                        w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all
                        ${isCurrent 
                          ? `bg-gradient-to-br ${config.color}` 
                          : isCompleted
                            ? 'bg-green-500'
                            : 'bg-muted'
                        }
                      `}>
                        {isCompleted ? (
                          <CheckCircle2 className="w-5 h-5 text-white" />
                        ) : (
                          <StepIcon className={`w-5 h-5 ${isCurrent ? 'text-white' : 'text-muted-foreground'}`} />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className={`text-sm mb-0.5 ${isCurrent ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {config.title}
                        </h4>
                        <p className="text-xs text-muted-foreground truncate">
                          {config.description}
                        </p>
                      </div>
                      {isCurrent && (
                        <CircleDot className={`w-5 h-5 ${config.iconColor} animate-pulse`} />
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="grid grid-cols-3 gap-4 pt-8 border-t border-border/50"
            >
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-green-500" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">Bank-Grade Security</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                    <Lock className="w-5 h-5 text-blue-500" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">256-bit Encryption</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <div className="w-10 h-10 rounded-xl bg-theme-primary/10 flex items-center justify-center">
                    <Award className="w-5 h-5 text-theme-primary" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">SEBI Registered</p>
              </div>
            </motion.div>
          </div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="pt-8 border-t border-border/50"
          >
            <p className="text-xs text-muted-foreground">
              By continuing, you agree to our Terms of Service and Privacy Policy. Your data is protected under Indian IT Act and SEBI regulations.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Mobile Header */}
        <div className="lg:hidden p-6 border-b border-border/50">
          <div className="flex items-center justify-between mb-4">
            <Logo />
            {onBack && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="rounded-xl"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
            )}
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Step {step} of {totalSteps}</span>
              <span className="text-theme-primary">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-1.5" />
          </div>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto p-6 lg:p-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-between gap-4 mt-12 pt-8 border-t border-border/50"
            >
              <Button
                variant="outline"
                onClick={() => setStep(Math.max(1, step - 1))}
                disabled={step === 1}
                className="rounded-xl px-6 h-12 border-border/50 hover:border-theme-primary/50 hover:bg-theme-primary/5 transition-all disabled:opacity-50"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              <div className="hidden lg:flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>Estimated time: {totalSteps - step + 1} min remaining</span>
              </div>

              <Button
                onClick={handleNext}
                className="rounded-xl px-6 h-12 bg-gradient-to-r from-theme-primary to-yellow-500 hover:from-theme-primary/90 hover:to-yellow-500/90 text-black shadow-lg shadow-theme-primary/20 hover:shadow-xl hover:shadow-theme-primary/30 transition-all"
              >
                {step === totalSteps ? (
                  <>
                    Complete KYC
                    <CheckCircle2 className="w-5 h-5 ml-2" />
                  </>
                ) : (
                  <>
                    Continue
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
