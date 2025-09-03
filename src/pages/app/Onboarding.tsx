import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, Upload, User, Shield, FileText, PenTool } from "lucide-react";
import { Helmet } from "react-helmet-async";

interface EntityData {
  legalName: string;
  cin: string;
  pan: string;
  gstin: string;
  registeredAddress: string;
  bankAccount: string;
}

interface DocumentData {
  coi: File | null;
  moaAoa: File | null;
  boardResolution: File | null;
  uboList: File | null;
}

interface UBOData {
  id: string;
  name: string;
  panLast4: string;
  addressProof: File | null;
  sanctionsStatus: 'pending' | 'clear' | 'checking';
}

interface RoleAssignment {
  userId: string;
  email: string;
  name: string;
  roles: string[];
}

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Form data states
  const [entityData, setEntityData] = useState<EntityData>({
    legalName: "Urban Threads Pvt Ltd",
    cin: "U74999MH2018PTC123456",
    pan: "ABCDE1234F",
    gstin: "27ABCDE1234F1Z5",
    registeredAddress: "123, Business Center, Mumbai - 400001",
    bankAccount: "****1234"
  });

  const [documents, setDocuments] = useState<DocumentData>({
    coi: null,
    moaAoa: null,
    boardResolution: null,
    uboList: null
  });

  const [ubos, setUbos] = useState<UBOData[]>([
    {
      id: "1",
      name: "",
      panLast4: "",
      addressProof: null,
      sanctionsStatus: 'pending'
    }
  ]);

  const [roleAssignments, setRoleAssignments] = useState<RoleAssignment[]>([]);
  const [consentAccepted, setConsentAccepted] = useState(false);

  // Load saved progress on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('onboarding_progress_v1');
    if (savedProgress) {
      try {
        const data = JSON.parse(savedProgress);
        setCurrentStep(data.currentStep || 1);
        setEntityData(data.entityData || entityData);
        setDocuments(data.documents || documents);
        setUbos(data.ubos || ubos);
        setRoleAssignments(data.roleAssignments || []);
        setConsentAccepted(data.consentAccepted || false);
      } catch (error) {
        console.error('Error loading saved progress:', error);
      }
    }

    // Initialize role assignments with demo users
    const users = JSON.parse(localStorage.getItem('users_v1') || '[]');
    const session = JSON.parse(sessionStorage.getItem('auth_session_v1') || '{}');
    
    if (users.length > 0 && roleAssignments.length === 0) {
      const assignments = users.map((user: any) => ({
        userId: user.email,
        email: user.email,
        name: user.name,
        roles: user.email === 'cfo@demo.in' ? ['Owner', 'Approver'] : 
               user.email === 'ops@demo.in' ? ['Preparer'] : []
      }));
      setRoleAssignments(assignments);
    }
  }, []);

  // Save progress whenever state changes
  useEffect(() => {
    const progress = {
      currentStep,
      entityData,
      documents,
      ubos,
      roleAssignments,
      consentAccepted
    };
    localStorage.setItem('onboarding_progress_v1', JSON.stringify(progress));
  }, [currentStep, entityData, documents, ubos, roleAssignments, consentAccepted]);

  const steps = [
    { number: 1, title: "Entity Basics", icon: FileText },
    { number: 2, title: "Documents", icon: Upload },
    { number: 3, title: "UBO/KYC", icon: User },
    { number: 4, title: "Roles", icon: Shield },
    { number: 5, title: "e-Sign", icon: PenTool }
  ];

  const handleFileUpload = (field: keyof DocumentData, file: File | null) => {
    setDocuments(prev => ({
      ...prev,
      [field]: file
    }));
  };

  const addUBO = () => {
    setUbos(prev => [...prev, {
      id: Date.now().toString(),
      name: "",
      panLast4: "",
      addressProof: null,
      sanctionsStatus: 'pending'
    }]);
  };

  const updateUBO = (id: string, field: keyof UBOData, value: any) => {
    setUbos(prev => prev.map(ubo => 
      ubo.id === id ? { ...ubo, [field]: value } : ubo
    ));
  };

  const runSanctionsCheck = (id: string) => {
    updateUBO(id, 'sanctionsStatus', 'checking');
    
    // Simulate sanctions check
    setTimeout(() => {
      updateUBO(id, 'sanctionsStatus', 'clear');
      toast({
        title: "Sanctions Check Complete",
        description: "No matches found in sanctions lists"
      });
    }, 2000);
  };

  const handleRoleChange = (email: string, role: string, checked: boolean) => {
    setRoleAssignments(prev => prev.map(assignment => {
      if (assignment.email === email) {
        const newRoles = checked 
          ? [...assignment.roles, role]
          : assignment.roles.filter(r => r !== role);
        return { ...assignment, roles: newRoles };
      }
      return assignment;
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Save entity data
    const entityId = "urban-threads";
    const entities = JSON.parse(localStorage.getItem('entities_v1') || '[]');
    const updatedEntities = entities.filter((e: any) => e.id !== entityId);
    updatedEntities.push({
      id: entityId,
      ...entityData,
      createdAt: new Date().toISOString()
    });
    localStorage.setItem('entities_v1', JSON.stringify(updatedEntities));

    // Save KYC data with Submitted status
    const kycData = JSON.parse(localStorage.getItem('kyc_v1') || '{}');
    kycData[entityId] = {
      status: 'Submitted',
      entityData,
      documents: Object.keys(documents).filter(key => documents[key as keyof DocumentData] !== null),
      ubos: ubos.filter(ubo => ubo.name && ubo.panLast4),
      roleAssignments,
      submittedAt: new Date().toISOString()
    };
    localStorage.setItem('kyc_v1', JSON.stringify(kycData));

    toast({
      title: "KYC Submitted",
      description: "Your application is being reviewed..."
    });

    // Simulate approval after 2 seconds
    setTimeout(() => {
      const updatedKycData = { ...kycData };
      updatedKycData[entityId].status = 'Approved';
      updatedKycData[entityId].approvedAt = new Date().toISOString();
      localStorage.setItem('kyc_v1', JSON.stringify(updatedKycData));

      // Clear onboarding progress
      localStorage.removeItem('onboarding_progress_v1');

      toast({
        title: "KYC Approved!",
        description: "Welcome to YourCo Treasury"
      });

      setIsSubmitting(false);
      
      // Redirect to dashboard after timeout
      setTimeout(() => {
        window.location.href = '/app/dashboard';
      }, 1000);
    }, 2000);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return entityData.legalName && entityData.cin && entityData.pan;
      case 2:
        return documents.coi && documents.boardResolution;
      case 3:
        return ubos.some(ubo => ubo.name && ubo.panLast4);
      case 4:
        return roleAssignments.some(assignment => assignment.roles.length > 0);
      case 5:
        return consentAccepted;
      default:
        return false;
    }
  };

  const progress = (currentStep / steps.length) * 100;

  return (
    <>
      <Helmet>
        <title>Onboarding - YourCo Treasury</title>
        <meta name="description" content="Complete your entity KYC and setup" />
      </Helmet>

      <div className="min-h-screen bg-bg">
        <div className="container mx-auto px-6 py-8 max-w-4xl">
          {/* Progress Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-text mb-4 font-display">
              Entity Onboarding
            </h1>
            <Progress value={progress} className="mb-6" />
            
            <div className="flex justify-between items-center">
              {steps.map((step) => {
                const Icon = step.icon;
                const isActive = step.number === currentStep;
                const isComplete = step.number < currentStep;
                
                return (
                  <div key={step.number} className="flex flex-col items-center">
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center mb-2 border-2
                      ${isComplete ? 'bg-primary border-primary text-primary-foreground' :
                        isActive ? 'border-primary text-primary' :
                        'border-muted text-muted'}
                    `}>
                      {isComplete ? <CheckCircle className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                    </div>
                    <span className={`text-sm font-medium ${
                      isActive ? 'text-primary' : isComplete ? 'text-text' : 'text-muted'
                    }`}>
                      {step.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step Content */}
          <Card>
            <CardHeader>
              <CardTitle>Step {currentStep}: {steps[currentStep - 1].title}</CardTitle>
              <CardDescription>
                {currentStep === 1 && "Enter your entity's basic information"}
                {currentStep === 2 && "Upload required documents"}
                {currentStep === 3 && "Add Ultimate Beneficial Owners (UBO) details"}
                {currentStep === 4 && "Assign roles to team members"}
                {currentStep === 5 && "Review and digitally sign"}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              {/* Step 1: Entity Basics */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="legalName">Legal Name *</Label>
                      <Input
                        id="legalName"
                        value={entityData.legalName}
                        onChange={(e) => setEntityData(prev => ({ ...prev, legalName: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="cin">CIN *</Label>
                      <Input
                        id="cin"
                        value={entityData.cin}
                        onChange={(e) => setEntityData(prev => ({ ...prev, cin: e.target.value }))}
                        placeholder="U74999MH2018PTC123456"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="pan">PAN *</Label>
                      <Input
                        id="pan"
                        value={entityData.pan}
                        onChange={(e) => setEntityData(prev => ({ ...prev, pan: e.target.value }))}
                        placeholder="ABCDE1234F"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="gstin">GSTIN</Label>
                      <Input
                        id="gstin"
                        value={entityData.gstin}
                        onChange={(e) => setEntityData(prev => ({ ...prev, gstin: e.target.value }))}
                        placeholder="27ABCDE1234F1Z5"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address">Registered Address *</Label>
                    <Textarea
                      id="address"
                      value={entityData.registeredAddress}
                      onChange={(e) => setEntityData(prev => ({ ...prev, registeredAddress: e.target.value }))}
                      rows={3}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="bankAccount">Primary Bank Account</Label>
                    <Input
                      id="bankAccount"
                      value={entityData.bankAccount}
                      onChange={(e) => setEntityData(prev => ({ ...prev, bankAccount: e.target.value }))}
                      placeholder="****1234 (last 4 digits)"
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Documents */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  {[
                    { key: 'coi', label: 'Certificate of Incorporation *', required: true },
                    { key: 'moaAoa', label: 'MoA/AoA or LLP Deed', required: false },
                    { key: 'boardResolution', label: 'Board Resolution/POA *', required: true },
                    { key: 'uboList', label: 'UBO Declaration', required: false }
                  ].map((doc) => (
                    <div key={doc.key} className="border border-border rounded-lg p-4">
                      <Label className="font-medium">{doc.label}</Label>
                      <div className="mt-2 flex items-center gap-4">
                        <Input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => handleFileUpload(doc.key as keyof DocumentData, e.target.files?.[0] || null)}
                          className="flex-1"
                        />
                        {documents[doc.key as keyof DocumentData] && (
                          <div className="flex items-center gap-2 text-primary">
                            <CheckCircle className="w-4 h-4" />
                            <span className="text-sm">Uploaded</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Step 3: UBO/KYC */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  {ubos.map((ubo, index) => (
                    <div key={ubo.id} className="border border-border rounded-lg p-6">
                      <h4 className="font-medium mb-4">UBO {index + 1}</h4>
                      
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <Label htmlFor={`ubo-name-${ubo.id}`}>Full Name *</Label>
                          <Input
                            id={`ubo-name-${ubo.id}`}
                            value={ubo.name}
                            onChange={(e) => updateUBO(ubo.id, 'name', e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor={`ubo-pan-${ubo.id}`}>PAN (last 4 digits) *</Label>
                          <Input
                            id={`ubo-pan-${ubo.id}`}
                            value={ubo.panLast4}
                            onChange={(e) => updateUBO(ubo.id, 'panLast4', e.target.value)}
                            placeholder="1234"
                            maxLength={4}
                            required
                          />
                        </div>
                      </div>

                      <div className="mb-4">
                        <Label>Address Proof</Label>
                        <Input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => updateUBO(ubo.id, 'addressProof', e.target.files?.[0] || null)}
                          className="mt-2"
                        />
                      </div>

                      <div className="flex items-center gap-4">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => runSanctionsCheck(ubo.id)}
                          disabled={ubo.sanctionsStatus === 'checking' || !ubo.name}
                        >
                          {ubo.sanctionsStatus === 'checking' && (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2"></div>
                          )}
                          Run Sanctions Check
                        </Button>
                        
                        {ubo.sanctionsStatus === 'clear' && (
                          <div className="flex items-center gap-2 text-green-600">
                            <CheckCircle className="w-4 h-4" />
                            <span className="text-sm">Clear</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  <Button type="button" variant="outline" onClick={addUBO}>
                    Add Another UBO
                  </Button>
                </div>
              )}

              {/* Step 4: Roles */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="text-sm text-muted mb-4">
                    Assign roles to team members. At least one person must have a role assigned.
                  </div>
                  
                  {roleAssignments.map((assignment) => (
                    <div key={assignment.email} className="border border-border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="font-medium">{assignment.name}</h4>
                          <p className="text-sm text-muted">{assignment.email}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {['Owner', 'Approver', 'Preparer', 'Auditor'].map((role) => (
                          <div key={role} className="flex items-center space-x-2">
                            <Checkbox
                              id={`${assignment.email}-${role}`}
                              checked={assignment.roles.includes(role)}
                              onCheckedChange={(checked) => 
                                handleRoleChange(assignment.email, role, checked as boolean)
                              }
                            />
                            <Label htmlFor={`${assignment.email}-${role}`} className="text-sm">
                              {role}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Step 5: e-Sign */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <div className="bg-surface border border-border rounded-lg p-6">
                    <h4 className="font-medium mb-4">Terms and Consent</h4>
                    <div className="prose text-sm text-muted mb-6">
                      <p>By proceeding, you confirm that:</p>
                      <ul className="list-disc ml-6">
                        <li>All information provided is accurate and complete</li>
                        <li>You have authority to bind the entity</li>
                        <li>You accept our Terms of Service and Privacy Policy</li>
                        <li>You consent to KYC verification and monitoring</li>
                      </ul>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="consent"
                        checked={consentAccepted}
                        onCheckedChange={(checked) => setConsentAccepted(checked as boolean)}
                      />
                      <Label htmlFor="consent" className="text-sm">
                        I accept the terms and conditions
                      </Label>
                    </div>
                  </div>

                  <div className="text-center">
                    <Button
                      onClick={handleSubmit}
                      disabled={!consentAccepted || isSubmitting}
                      size="lg"
                      className="min-w-48"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          <PenTool className="w-4 h-4 mr-2" />
                          Complete e-Sign
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
              disabled={currentStep === 1 || isSubmitting}
            >
              Previous
            </Button>
            
            {currentStep < steps.length ? (
              <Button
                onClick={() => setCurrentStep(prev => prev + 1)}
                disabled={!canProceed() || isSubmitting}
              >
                Next
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Onboarding;