
"use client";

import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { PrescriptionFormValues } from './prescription-form';
import { format } from 'date-fns';
import { Button } from './ui/button';
import { RefreshCw } from 'lucide-react';

interface PrescriptionPreviewProps {
    data: PrescriptionFormValues;
    abbreviatedInstructions: string;
    prescriptionId: string;
    onGenerateId: () => void;
}

export function PrescriptionPreview({ data, abbreviatedInstructions, prescriptionId, onGenerateId }: PrescriptionPreviewProps) {
    const { 
        patientName, patientDob, patientAddress,
        medicationName, dosage, frequency, route, specialInstructions,
        includeLogo, includeSignature, includeStamp 
    } = data;

    const hospitalLogoUrl = "https://static.vecteezy.com/system/resources/previews/011/640/711/non_2x/simple-modern-hospital-logo-with-healthcare-medical-template-vector.jpg";
    const doctorSignatureUrl = "https://www.clipartmax.com/png/middle/463-4630490_generator-signature-doctor-fake-bill-kaulitz-signature.png";
    const hospitalStampUrl = "https://media.istockphoto.com/id/927930872/vector/grunge-blue-healthcare-accreditation-with-stethoscope-icon-round-rubber-seal-stamp-on-white.jpg?s=612x612&w=0&k=20&c=4GS7fXOgI7Vivm9p7_Z_8Y2ExqryPsPwrB-NgbnM9wo=";

    return (
        <Card className="shadow-lg overflow-hidden">
            <CardContent className="p-6 md:p-8 aspect-[8.5/11] bg-white text-black flex flex-col font-mono text-sm shadow-inner">
                <header className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                        {includeLogo && <Image src={hospitalLogoUrl} alt="Hospital Logo" width={60} height={60} className="object-contain" data-ai-hint="hospital logo" />}
                        <div>
                            <h2 className="font-bold text-lg font-headline">General Hospital</h2>
                            <p className="text-xs">123 Health St, Wellness City</p>
                            <p className="text-xs">Phone: (123) 456-7890</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <h3 className="font-bold text-base font-headline">Dr. A. Smith, M.D.</h3>
                        <p className="text-xs">License: #12345</p>
                    </div>
                </header>

                <Separator className="bg-gray-300" />
                
                <section className="grid grid-cols-2 gap-x-8 my-4">
                     <div>
                        <p><span className="font-bold">Patient:</span> {patientName || "________________"}</p>
                        <p className="break-words"><span className="font-bold">Address:</span> {patientAddress || "________________"}</p>
                     </div>
                     <div className="text-right">
                         <p><span className="font-bold">DOB:</span> {patientDob ? format(patientDob, 'MM/dd/yyyy') : "____/____/____"}</p>
                         <p><span className="font-bold">Date:</span> {format(new Date(), 'MM/dd/yyyy')}</p>
                     </div>
                </section>
                
                <Separator className="bg-gray-300" />

                <div className="flex-grow mt-6 relative min-h-[200px]">
                    <div className="flex items-start gap-4">
                       <span className="font-serif text-5xl font-bold text-gray-700 leading-none pt-1">℞</span>
                       <div className="w-full pt-1">
                         <p className="font-bold text-base">{medicationName || "________________"}</p>
                         <p>{dosage || "____"} {route || "____"}</p>
                       </div>
                    </div>

                    <div className="mt-4 pl-14 space-y-2">
                        <p><span className="font-bold">Sig:</span> {frequency || "As directed"}</p>
                        {abbreviatedInstructions && <p className="font-bold text-blue-600">{abbreviatedInstructions}</p>}
                        {specialInstructions && <p className="text-xs italic">"{specialInstructions}"</p>}
                    </div>
                    
                    {includeStamp && <Image src={hospitalStampUrl} alt="Hospital Stamp" width={100} height={100} className="absolute bottom-10 right-24 opacity-60 pointer-events-none" data-ai-hint="hospital stamp" />}
                </div>

                <footer className="mt-auto pt-8 border-t border-dashed border-gray-400">
                     <div className="flex justify-between items-end">
                        <div className="text-xs">
                            <div className='flex items-center gap-2'>
                                <span className="font-bold">ID: {prescriptionId}</span>
                                <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-500 hover:text-black" onClick={onGenerateId}>
                                    <RefreshCw className="h-3 w-3" />
                                    <span className="sr-only">Generate New ID</span>
                                </Button>
                            </div>
                            <p className="mt-2 text-gray-600">Dispense as Written</p>
                        </div>
                        <div className="text-center w-48">
                            {includeSignature && <Image src={doctorSignatureUrl} alt="Doctor's Signature" width={150} height={60} className="mx-auto object-contain -mb-4" data-ai-hint="doctor signature" />}
                            <p className="border-t border-black mt-1 pt-1 w-full text-xs">Dr. A. Smith, M.D.</p>
                        </div>
                     </div>
                </footer>
            </CardContent>
        </Card>
    );
}
