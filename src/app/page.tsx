"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function PrescriptionGenerator() {
  // Form state
  const [formData, setFormData] = useState({
    // Hospital Info
    hospitalName: "Metro Multispeciality Hospital",
    hospitalAddress: "34, Medical College Road, Parel, Mumbai - 400012",
    hospitalPhone: "Appointments: (022) 2654-1234 | Emergency: (022) 2654-9999",
    hospitalLogo: "https://media.istockphoto.com/id/1431615746/vector/plus-medical-logo-illustration.jpg?s=612x612&w=0&k=20&c=TbOyD863QVczZK-E42gi8mD6ajglCLyodcpfV5dolMo=",
    
    // Doctor Info
    doctorName: "Dr. Ananya Sharma",
    doctorQualification: "MD (Medicine), DNB (Cardiology)",
    doctorRegistration: "MCI-54321",
    doctorContact: "Clinic: (022) 2654-1234 | Emergency: +91 98765 43210",
    doctorSignature: "https://icon2.cleanpng.com/20180604/sqf/aa9qr7x39.webp",
    doctorStamp: "https://www.transparentpng.com/thumb/stamp/medical-stamp-png-clipart-8.png",
    
    // Patient Info
    patientName: "Mr. Rajesh Kumar",
    patientAge: "45 years",
    patientGender: "Male",
    patientContact: "+91 98765 12345",
    
    // Prescription Info
    diagnosis: "1. Essential Hypertension (I10)\n2. Type 2 Diabetes Mellitus (E11.9)",
    medicines: `1. Tab. Telmisartan 40mg + Hydrochlorothiazide 12.5mg - 1-0-1 (After breakfast & dinner)\n2. Tab. Metformin SR 500mg - 1-0-1 (With meals)\n3. Tab. Atorvastatin 20mg - 0-0-1 (At bedtime)`,
    advice: "1. Low salt, low sugar diet\n2. Regular exercise 30min/day\n3. Monitor BP & sugar weekly\n4. Follow up in 4 weeks"
  });

  const [showPrescription, setShowPrescription] = useState(false);
  const [prescriptionId, setPrescriptionId] = useState('');
  const [prescriptionDate, setPrescriptionDate] = useState('');

  useEffect(() => {
    if (showPrescription) {
        setPrescriptionId(`RX-${Math.floor(Math.random() * 90000) + 10000}`);
        setPrescriptionDate(new Date().toLocaleDateString('en-IN'));
    }
  }, [showPrescription]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string, value: string }}) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowPrescription(true);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleEdit = () => {
    setShowPrescription(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 print:p-0">
      {!showPrescription ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold font-headline">Prescription Form</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Hospital Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-4 text-lg border-b pb-2 font-headline">Hospital Information</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="hospitalName" className="block text-sm font-medium mb-1">Hospital Name</Label>
                      <Input
                        type="text"
                        id="hospitalName"
                        name="hospitalName"
                        value={formData.hospitalName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="hospitalAddress" className="block text-sm font-medium mb-1">Address</Label>
                      <Textarea
                        id="hospitalAddress"
                        name="hospitalAddress"
                        value={formData.hospitalAddress}
                        onChange={handleChange}
                        rows={3}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="hospitalPhone" className="block text-sm font-medium mb-1">Contact Numbers</Label>
                      <Input
                        type="text"
                        id="hospitalPhone"
                        name="hospitalPhone"
                        value={formData.hospitalPhone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="hospitalLogo" className="block text-sm font-medium mb-1">Logo URL</Label>
                      <Input
                        type="url"
                        id="hospitalLogo"
                        name="hospitalLogo"
                        value={formData.hospitalLogo}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Doctor Information */}
                <div>
                  <h3 className="font-semibold mb-4 text-lg border-b pb-2 font-headline">Doctor Information</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="doctorName" className="block text-sm font-medium mb-1">Doctor Name</Label>
                      <Input
                        type="text"
                        id="doctorName"
                        name="doctorName"
                        value={formData.doctorName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="doctorQualification" className="block text-sm font-medium mb-1">Qualifications</Label>
                      <Input
                        type="text"
                        id="doctorQualification"
                        name="doctorQualification"
                        value={formData.doctorQualification}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="doctorRegistration" className="block text-sm font-medium mb-1">Registration Number</Label>
                      <Input
                        type="text"
                        id="doctorRegistration"
                        name="doctorRegistration"
                        value={formData.doctorRegistration}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="doctorContact" className="block text-sm font-medium mb-1">Contact Numbers</Label>
                      <Input
                        type="text"
                        id="doctorContact"
                        name="doctorContact"
                        value={formData.doctorContact}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="doctorSignature" className="block text-sm font-medium mb-1">Signature Image URL</Label>
                      <Input
                        type="url"
                        id="doctorSignature"
                        name="doctorSignature"
                        value={formData.doctorSignature}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="doctorStamp" className="block text-sm font-medium mb-1">Stamp Image URL</Label>
                      <Input
                        type="url"
                        id="doctorStamp"
                        name="doctorStamp"
                        value={formData.doctorStamp}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Patient Information */}
              <div>
                <h3 className="font-semibold mb-4 text-lg border-b pb-2 font-headline">Patient Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="patientName" className="block text-sm font-medium mb-1">Patient Name</Label>
                    <Input
                      type="text"
                      id="patientName"
                      name="patientName"
                      value={formData.patientName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="patientAge" className="block text-sm font-medium mb-1">Age</Label>
                    <Input
                      type="text"
                      id="patientAge"
                      name="patientAge"
                      value={formData.patientAge}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="patientGender" className="block text-sm font-medium mb-1">Gender</Label>
                    <Select
                      name="patientGender"
                      value={formData.patientGender}
                      onValueChange={(value) => handleChange({ target: { name: 'patientGender', value } })}
                      required
                    >
                      <SelectTrigger id="patientGender">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="md:col-span-3">
                    <Label htmlFor="patientContact" className="block text-sm font-medium mb-1">Contact Number</Label>
                    <Input
                      type="text"
                      id="patientContact"
                      name="patientContact"
                      value={formData.patientContact}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Medical Information */}
              <div>
                <h3 className="font-semibold mb-4 text-lg border-b pb-2 font-headline">Medical Information</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="diagnosis" className="block text-sm font-medium mb-1">Diagnosis</Label>
                    <Textarea
                      id="diagnosis"
                      name="diagnosis"
                      value={formData.diagnosis}
                      onChange={handleChange}
                      rows={3}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="medicines" className="block text-sm font-medium mb-1">Medicines (One per line)</Label>
                    <Textarea
                      id="medicines"
                      name="medicines"
                      value={formData.medicines}
                      onChange={handleChange}
                      className="font-mono"
                      rows={6}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="advice" className="block text-sm font-medium mb-1">Medical Advice</Label>
                    <Textarea
                      id="advice"
                      name="advice"
                      value={formData.advice}
                      onChange={handleChange}
                      rows={3}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <Button type="submit" size="lg">
                  Generate Prescription
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        // Prescription Display
        <div className="bg-white p-6 border rounded-lg print:border-0 print:shadow-none print:p-2 print:max-w-none print:h-auto text-black" style={{ minHeight: '29.7cm' }}>
          {/* Hospital Header */}
          <div className="flex justify-between items-start mb-4 pb-3 border-b print:border-b-2 print:pb-2">
            <div className="flex items-center">
              <div className="mr-3 w-16 h-16 flex items-center justify-center bg-white p-1 rounded-full border">
                <Image 
                  src={formData.hospitalLogo} 
                  alt="Hospital Logo" 
                  width={60}
                  height={60}
                  className="object-contain p-1"
                  data-ai-hint="hospital logo"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' fill='%23e6f2ff' stroke='%23296fdb' stroke-width='2'/%3E%3Ctext x='50%' y='50%' font-family='Arial' font-size='14' text-anchor='middle' dominant-baseline='middle' fill='%23296fdb'%3EH%3C/text%3E%3C/svg%3E";
                  }}
                />
              </div>
              <div>
                <h1 className="text-lg font-bold font-headline">{formData.hospitalName}</h1>
                <p className="text-xs">{formData.hospitalAddress}</p>
                <p className="text-xs">{formData.hospitalPhone}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium uppercase">Medical Prescription</p>
              <p className="text-xs">No: {prescriptionId}</p>
              <p className="text-xs">Date: {prescriptionDate}</p>
            </div>
          </div>

          {/* Doctor & Patient Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm print:gap-2">
            <div>
              <h2 className="text-xs font-bold mb-1 border-b pb-1 uppercase print:text-[0.65rem]">
                Consulting Physician
              </h2>
              <p className="font-medium">{formData.doctorName}</p>
              <p className="text-xs">{formData.doctorQualification}</p>
              <p className="text-xs">Reg No: {formData.doctorRegistration}</p>
              <p className="text-xs">{formData.doctorContact}</p>
            </div>
            <div>
              <h2 className="text-xs font-bold mb-1 border-b pb-1 uppercase print:text-[0.65rem]">
                Patient Details
              </h2>
              <p className="font-medium">{formData.patientName}</p>
              <p className="text-xs">{formData.patientAge}, {formData.patientGender}</p>
              <p className="text-xs">Contact: {formData.patientContact}</p>
              <p className="text-xs">Date: {prescriptionDate}</p>
            </div>
          </div>

          {/* Diagnosis */}
          <div className="mb-3">
            <h2 className="text-xs font-bold mb-1 border-b pb-1 uppercase print:text-[0.65rem]">
              Diagnosis
            </h2>
            <div className="whitespace-pre-line text-xs">
              {formData.diagnosis}
            </div>
          </div>

          {/* Medicines */}
          <div className="mb-3">
            <h2 className="text-xs font-bold mb-1 border-b pb-1 uppercase print:text-[0.65rem]">
              Rx
            </h2>
            <div className="whitespace-pre-line text-xs font-mono">
              {formData.medicines}
            </div>
          </div>

          {/* Medical Advice */}
          <div className="mb-4">
            <h2 className="text-xs font-bold mb-1 border-b pb-1 uppercase print:text-[0.65rem]">
              Advice
            </h2>
            <div className="whitespace-pre-line text-xs">
              {formData.advice}
            </div>
          </div>

          {/* Signature & Stamp */}
          <div className="flex justify-between items-end mt-8 pt-3 border-t print:border-t-2 print:pt-2">
            <div className="flex-1">
              <p className="text-[0.6rem] mb-1">Doctor's Signature</p>
              <div className="h-16 w-32 relative">
                <Image 
                  src={formData.doctorSignature} 
                  alt="Doctor's Signature" 
                  layout="fill"
                  className="object-contain"
                  data-ai-hint="doctor signature"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 30'%3E%3Cpath d='M5 15 Q25 5 45 15 T85 15' stroke='%23296fdb' stroke-width='2' fill='none'/%3E%3Cpath d='M85 15 L75 20 M85 15 L75 10' stroke='%23296fdb' stroke-width='2'/%3E%3C/svg%3E";
                  }}
                />
              </div>
              <p className="text-xs mt-1">{formData.doctorName}</p>
            </div>
            <div className="flex-1 text-right">
              <p className="text-[0.6rem] mb-1">Official Stamp</p>
              <div className="h-16 w-32 inline-block relative">
                <Image 
                  src={formData.doctorStamp} 
                  alt="Doctor's Stamp" 
                  layout="fill"
                  className="object-contain"
                  data-ai-hint="official stamp"
                />
              </div>
            </div>
          </div>

          {/* Prescription Footer */}
          <div className="mt-8 pt-2 border-t text-[0.6rem] text-center print:border-t-2 print:pt-1">
            <p>This is a digitally generated prescription. Valid only when signed and stamped by a registered medical practitioner.</p>
            <p>{formData.hospitalName} © {new Date().getFullYear()} | All prescriptions are electronically recorded</p>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex justify-center gap-4 print:hidden">
            <Button 
              onClick={handlePrint}
            >
              Print Prescription
            </Button>
            <Button 
              onClick={handleEdit}
              variant="secondary"
            >
              Edit Prescription
            </Button>
          </div>
        </div>
      )}

      {/* Print Styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body {
            background: white;
            font-size: 10pt;
            margin: 0;
            padding: 0;
          }
          @page {
            size: A4;
            margin: 0.5cm;
          }
          .print\\:p-0 { padding: 0 !important; }
          .print\\:p-2 { padding: 0.5rem !important; }
          .print\\:border-0 { border: none !important; }
          .print\\:shadow-none { box-shadow: none !important; }
          .print\\:border-b-2 { border-bottom-width: 1pt !important; border-color: #333 !important; }
          .print\\:border-t-2 { border-top-width: 1pt !important; border-color: #333 !important; }
          .print\\:hidden { display: none !important; }
          .print\\:max-w-none { max-width: none !important; }
          .print\\:h-auto { height: auto !important; }
          .print\\:gap-2 { gap: 0.5rem !important; }
          .print\\:text-\\[0\\.65rem\\] { font-size: 0.65rem !important; }
          .print\\:pt-1 { padding-top: 0.25rem !important; }
          .print\\:pt-2 { padding-top: 0.5rem !important; }
          .print\\:pb-2 { padding-bottom: 0.5rem !important; }
        }
      `}} />
    </div>
  );
}
