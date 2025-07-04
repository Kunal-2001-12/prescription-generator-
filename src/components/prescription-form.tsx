
"use client";

import { z } from 'zod';
import { type UseFormReturn } from 'react-hook-form';
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Bot, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export const prescriptionSchema = z.object({
  patientName: z.string().min(1, 'Patient name is required.'),
  patientDob: z.date(),
  patientAddress: z.string().min(1, 'Patient address is required.'),
  medicationName: z.string().min(1, 'Medication name is required.'),
  dosage: z.string().min(1, 'Dosage is required.'),
  frequency: z.string().min(1, 'Frequency is required.'),
  route: z.string(),
  specialInstructions: z.string().optional(),
  includeLogo: z.boolean(),
  includeSignature: z.boolean(),
  includeStamp: z.boolean(),
});

export type PrescriptionFormValues = z.infer<typeof prescriptionSchema>;

interface PrescriptionFormProps {
    form: UseFormReturn<PrescriptionFormValues>;
    onAbbreviate: () => void;
    isGenerating: boolean;
}

export function PrescriptionForm({ form, onAbbreviate, isGenerating }: PrescriptionFormProps) {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl tracking-tight">Prescription Details</CardTitle>
        <CardDescription>Fill in the details to generate a new prescription.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-8">
            <div className="space-y-4">
                <h3 className="text-lg font-semibold font-headline text-gray-700 dark:text-gray-300">Patient Information</h3>
                <FormField
                    control={form.control}
                    name="patientName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Patient Name</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g., John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="patientDob"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Date of Birth</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                <FormControl>
                                    <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-[240px] pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                    )}
                                    >
                                    {field.value ? (
                                        format(field.value, "PPP")
                                    ) : (
                                        <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) =>
                                    date > new Date() || date < new Date("1900-01-01")
                                    }
                                    initialFocus
                                />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="patientAddress"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Patient Address</FormLabel>
                            <FormControl>
                                <Textarea placeholder="e.g., 123 Main St, Anytown, USA" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold font-headline text-gray-700 dark:text-gray-300">Medication & Instructions</h3>
              <FormField
                control={form.control}
                name="medicationName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Medication Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Amoxicillin" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="dosage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dosage</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 500mg" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="frequency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Frequency</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., twice daily" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                  control={form.control}
                  name="route"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Route</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a route of administration" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Oral">Oral</SelectItem>
                          <SelectItem value="Topical">Topical</SelectItem>
                          <SelectItem value="Intravenous">Intravenous</SelectItem>
                          <SelectItem value="Intramuscular">Intramuscular</SelectItem>
                          <SelectItem value="Sublingual">Sublingual</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                    control={form.control}
                    name="specialInstructions"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Special Instructions (for AI)</FormLabel>
                            <FormControl>
                                <Textarea placeholder="e.g., Take with food. Finish all medication." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="button" onClick={onAbbreviate} disabled={isGenerating}>
                    {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Bot className="mr-2 h-4 w-4" />}
                    Intelligent Abbreviation
                </Button>
            </div>

            <Separator />
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold font-headline text-gray-700 dark:text-gray-300">Branding Elements</h3>
              <FormField
                control={form.control}
                name="includeLogo"
                render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                        <div className="space-y-0.5">
                            <FormLabel>Include Hospital Logo</FormLabel>
                        </div>
                        <FormControl>
                            <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                            />
                        </FormControl>
                    </FormItem>
                )}
               />
               <FormField
                control={form.control}
                name="includeSignature"
                render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                        <div className="space-y-0.5">
                            <FormLabel>Include Doctor's Signature</FormLabel>
                        </div>
                        <FormControl>
                            <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                            />
                        </FormControl>
                    </FormItem>
                )}
               />
               <FormField
                control={form.control}
                name="includeStamp"
                render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                        <div className="space-y-0.5">
                            <FormLabel>Include Hospital Stamp</FormLabel>
                        </div>
                        <FormControl>
                            <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                            />
                        </FormControl>
                    </FormItem>
                )}
               />
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
