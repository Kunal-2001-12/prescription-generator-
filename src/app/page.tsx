
"use client";

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { abbreviatePrescription } from '@/ai/flows/abbreviate-prescription';
import { useToast } from "@/hooks/use-toast";

import { PrescriptionForm, prescriptionSchema, type PrescriptionFormValues } from '@/components/prescription-form';
import { PrescriptionPreview } from '@/components/prescription-preview';
import { Pill } from 'lucide-react';

export default function Home() {
  const { toast } = useToast();
  const [prescriptionData, setPrescriptionData] = useState<PrescriptionFormValues | null>(null);
  const [abbreviatedInstructions, setAbbreviatedInstructions] = useState('');
  const [prescriptionId, setPrescriptionId] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const form = useForm<PrescriptionFormValues>({
    resolver: zodResolver(prescriptionSchema),
    defaultValues: {
      patientName: 'John Doe',
      patientDob: new Date('1985-04-12'),
      patientAddress: '123 Main St, Anytown, USA 12345',
      medicationName: 'Amoxicillin',
      dosage: '500mg',
      frequency: 'twice daily',
      route: 'Oral',
      specialInstructions: 'Take with a full glass of water.',
      includeLogo: true,
      includeSignature: true,
      includeStamp: true,
    },
  });

  const generateId = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 12; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPrescriptionId(`RX-${result}`);
  };

  useEffect(() => {
    generateId();
    setPrescriptionData(form.getValues());
  }, []);

  useEffect(() => {
    const subscription = form.watch((value) => {
        setPrescriptionData(value as PrescriptionFormValues);
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

  const handleGenerateAbbreviation = async () => {
    const { dosage, frequency, route, specialInstructions } = form.getValues();
    if (!dosage || !frequency) {
        toast({
            title: "Missing Information",
            description: "Please provide dosage and frequency to generate abbreviations.",
            variant: "destructive",
        });
        return;
    }

    setIsGenerating(true);
    setAbbreviatedInstructions('Generating...');
    try {
        const result = await abbreviatePrescription({
            dosage,
            frequency,
            route,
            instructions: specialInstructions,
        });
        setAbbreviatedInstructions(result.abbreviatedInstructions);
    } catch (error) {
        console.error(error);
        setAbbreviatedInstructions('Failed to generate. Please try again.');
        toast({
            title: "AI Error",
            description: "Could not generate abbreviation. Please check your inputs or try again later.",
            variant: "destructive",
        });
    } finally {
        setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b sticky top-0 z-10 bg-background/95 backdrop-blur-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
              <div className="flex items-center gap-3">
                  <div className="bg-primary text-primary-foreground p-2 rounded-lg">
                    <Pill className="h-6 w-6" />
                  </div>
                  <h1 className="text-2xl font-headline font-bold text-gray-800 dark:text-gray-200">RxSwift</h1>
              </div>
          </div>
      </header>
      <main className="flex-grow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <PrescriptionForm 
                form={form} 
                onAbbreviate={handleGenerateAbbreviation}
                isGenerating={isGenerating}
            />
            {prescriptionData && (
                <div className="sticky top-24">
                    <PrescriptionPreview 
                        data={prescriptionData}
                        abbreviatedInstructions={abbreviatedInstructions}
                        prescriptionId={prescriptionId}
                        onGenerateId={generateId}
                    />
                </div>
            )}
            </div>
        </div>
      </main>
    </div>
  );
}
