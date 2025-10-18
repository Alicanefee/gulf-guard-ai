const [secondsLeft, setSecondsLeft] = useState<number>(3600);
const [benefitActive, setBenefitActive] = useState(true);

  const benefitMap: Record<string, string> = {
    'Essential': "Exclusive offer activated: Mold Test included for your booking.",
    'Comprehensive': "Exclusive offer activated: Negative Pressure Test included for your booking.",
    'VIP': "Exclusive offer activated: Negative Pressure Test & Second Follow-Up included for your booking.",
    'Estate': "Exclusive offer activated: Air Quality Test included for your booking.",
    'Air Quality Pack': "Exclusive offer activated: Post-Improvement Verification included for your booking.",
    'Investor Pack': "Exclusive offer activated: Unique Investor Code 'NEW20' reserved for your booking.",
  };

const submit = async (e?: React.FormEvent) => {
if (e) e.preventDefault();
if (!propertySize) return alert('Please enter property size (sqft) to personalize your booking.');
@@ -39,7 +48,7 @@ export const InlineBookingCard: React.FC<Props> = ({ pkgId, onClose }) => {
{benefitActive && (
<div>
<div className="booking-banner">Offer activated – expires in {Math.floor(secondsLeft/60)}m {secondsLeft%60}s</div>
            <div className="mb-2 text-sm font-semibold text-accent">Private benefit activated for you.</div>
            <div className="mb-2 text-sm font-semibold text-accent">{benefitMap[pkgId] || 'Private benefit activated for you.'}</div>
</div>
)}
<CountdownScarcity timeLeftOverride={secondsLeft} />
