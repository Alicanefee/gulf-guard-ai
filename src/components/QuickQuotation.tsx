import React, { useState, useEffect, useRef } from 'react';
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup } from '@/components/ui/radio-group';
import { PACKAGES, getPackageById } from '@/lib/packages';
import { useBooking } from '@/components/booking/BookingProvider';
import { Input } from '@/components/ui/input';

type UserType = 'buyer' | 'investor' | 'agency' | '';

const QuickQuotation: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState<UserType>('');
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [agencyContact, setAgencyContact] = useState({ name: '', email: '', phone: '' });
  const { openBookingCard } = useBooking();
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (open) {
      setStep(1);
      setUserType('');
      setSelectedPackage(null);
      setAgencyContact({ name: '', email: '', phone: '' });
    }
  }, [open]);

  // auto-focus first control on step change
  useEffect(() => {
    setTimeout(() => {
      const el = dialogRef.current?.querySelector('button, input, [role="radio"]') as HTMLElement | null;
      el?.focus();
    }, 120);
  }, [step, open]);

  const buyerOptions = PACKAGES.filter(p => ['essential','comprehensive','vip','air-quality'].includes(p.id));

  const proceed = () => {
    if (userType === 'buyer' && selectedPackage) {
      openBookingCard(selectedPackage);
      setOpen(false);
      return;
    }
    if (userType === 'investor') {
      // open investor pack booking
      openBookingCard('investor');
      setOpen(false);
      return;
    }
    if (userType === 'agency') {
      // open a lightweight booking/inquiry — here we reuse booking card with no package and send agency contact
      openBookingCard(null as any);
      // You may want to send agencyContact to backend here
      setOpen(false);
      return;
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v)=>setOpen(v)}>
      <DialogTrigger asChild>
        <Button variant="premium-outline" size="xl">Quick Quotation</Button>
      </DialogTrigger>

      <DialogContent className="w-[95%] max-w-2xl p-0" ref={(el:any)=>dialogRef.current = el}>
        <Card>
          <CardHeader>
            <CardTitle>Quick Quotation</CardTitle>
            <CardDescription>Fast price estimates — pick your route</CardDescription>
          </CardHeader>

          <CardContent>
            {/* Step 1: choose user type */}
            {step === 1 && (
              <div className="space-y-4">
                <div className="flex gap-3">
                  <button className={`px-4 py-2 rounded-lg ${userType==='buyer'?'bg-accent text-accent-foreground':'border'}`} onClick={()=>{setUserType('buyer'); setStep(2);}}>
                    Buyer
                  </button>
                  <button className={`px-4 py-2 rounded-lg ${userType==='investor'?'bg-accent text-accent-foreground':'border'}`} onClick={()=>{setUserType('investor'); setStep(2);}}>
                    Investor
                  </button>
                  <button className={`px-4 py-2 rounded-lg ${userType==='agency'?'bg-accent text-accent-foreground':'border'}`} onClick={()=>{setUserType('agency'); setStep(2);}}>
                    Agency
                  </button>
                </div>
                <div className="text-sm text-muted-foreground">Choose who you are so we can tailor the estimate.</div>
              </div>
            )}

            {/* Step 2: buyer/investor/agency details */}
            {step === 2 && userType === 'buyer' && (
              <div className="space-y-4">
                <div className="overflow-x-auto flex gap-3 py-2">
                  {buyerOptions.map(p => (
                    <div key={p.id} className={`min-w-[180px] p-3 rounded-lg border ${selectedPackage===p.id?'bg-accent text-accent-foreground':'bg-background'}`}>
                      <div className="font-semibold mb-1">{p.name}</div>
                      <div className="text-sm text-muted-foreground mb-2">{p.summary}</div>
                      <Button size="sm" onClick={()=>setSelectedPackage(p.id)}>Select</Button>
                    </div>
                  ))}
                </div>

                {selectedPackage ? (
                  (()=>{
                    const pkg = getPackageById(selectedPackage);
                    if (!pkg) return null;
                    return (
                      <div className="border rounded-lg p-3">
                        <div className="font-semibold text-lg">{pkg.name}</div>
                        <div className="text-sm text-muted-foreground mb-2">{pkg.summary}</div>
                        <ul className="list-disc list-inside text-sm text-muted-foreground">
                          {pkg.features.map((f,i)=> <li key={i}>{f}</li>)}
                        </ul>
                        <div className="mt-4 flex gap-2">
                          <Button variant="premium" onClick={proceed}>Book {pkg.name}</Button>
                          <Button variant="outline" onClick={()=>setStep(1)}>Back</Button>
                        </div>
                      </div>
                    )
                  })()
                ) : (
                  <div className="text-sm text-muted-foreground">Choose a package to view details and proceed to booking.</div>
                )}
              </div>
            )}

            {step === 2 && userType === 'investor' && (
              <div className="space-y-4">
                <div className="font-semibold">Investor Pack</div>
                <div className="text-sm text-muted-foreground">{getPackageById('investor')?.summary}</div>
                <ul className="list-disc list-inside text-sm text-muted-foreground">
                  {getPackageById('investor')?.features.map((f,i)=>(<li key={i}>{f}</li>))}
                </ul>
                <div className="mt-4 flex gap-2">
                  <Button variant="premium" onClick={proceed}>Book Investor Pack</Button>
                  <Button variant="outline" onClick={()=>setStep(1)}>Back</Button>
                </div>
              </div>
            )}

            {step === 2 && userType === 'agency' && (
              <div className="space-y-4">
                <div className="font-semibold">Agency Contact</div>
                <div className="text-sm text-muted-foreground">Please leave your contact details so we can reach out with enterprise pricing.</div>
                <div className="grid grid-cols-1 gap-3">
                  <Input placeholder="Agency name" value={agencyContact.name} onChange={(e)=>setAgencyContact({...agencyContact, name: e.target.value})} />
                  <Input placeholder="Email" value={agencyContact.email} onChange={(e)=>setAgencyContact({...agencyContact, email: e.target.value})} />
                  <Input placeholder="Phone" value={agencyContact.phone} onChange={(e)=>setAgencyContact({...agencyContact, phone: e.target.value})} />
                </div>
                <div className="mt-4 flex gap-2">
                  <Button variant="premium" onClick={proceed}>Submit Contact</Button>
                  <Button variant="outline" onClick={()=>setStep(1)}>Back</Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default QuickQuotation;
