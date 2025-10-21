import { Home, Sparkles, TrendingUp, Building2, Heart, Users } from 'lucide-react';

export type PackageDef = {
  id: string;
  name: string;
  icon?: any;
  popular?: boolean;
  cta?: string;
  summary?: string;
  features: string[];
};

export const PACKAGES: PackageDef[] = [
  {
    id: 'essential',
    name: 'Essential',
    icon: Home,
    popular: false,
    cta: 'Lock in for 1,199 AED',
    summary: 'Core inspection with thermal imaging, moisture mapping and basic lab tests.',
    features: [
      'Moisture & leak mapping',
      'Thermal imaging',
      'Electrical/plumbing leak test',
      'AI risk score',
      'Endoscopy',
      'Noise & particle measurement',
      'Mold test (1 session)',
    ],
  },
  {
    id: 'comprehensive',
    name: 'Comprehensive',
    icon: Sparkles,
    popular: true,
    cta: 'Upgrade to 2,999 AED – get 3D scan',
    summary: 'Full home assessment including 3D LiDAR and extended lab tests.',
    features: [
      'Everything in Essential',
      'Mold test x3',
      'Full inspection video (1 year storage)',
      '3D LiDAR scan',
    ],
  },
  {
    id: 'vip',
    name: 'VIP',
    icon: TrendingUp,
    popular: false,
    cta: 'Go VIP for 4,000 AED – 2nd check free',
    summary: 'Priority service, re-inspections and advanced air quality measurement.',
    features: [
      'Everything in Comprehensive',
      'Advanced air quality check',
      'Pre/post-repair report (1 in 3 months)',
    ],
  },
  {
    id: 'estate',
    name: 'Estate',
    icon: Building2,
    popular: false,
    cta: 'Enjoy estate status benefits',
    summary: 'Enterprise-grade coverage for large properties and portfolios.',
    features: [
      'Everything in VIP',
      'Dedicated team',
      'Custom pre-report',
      '24/7 priority booking',
      'Root cause analysis',
    ],
  },
  {
    id: 'air-quality',
    name: 'Air Quality Pack',
    icon: Heart,
    popular: false,
    cta: 'Start healthy at 2,700 AED',
    summary: 'Specialised air quality testing and mold analysis to protect occupant health.',
    features: [
      'Negative pressure test',
      'Mold measurement',
      'Full air quality analysis',
    ],
  },
  {
    id: 'investor',
    name: 'Investor Pack',
    icon: Users,
    popular: false,
    cta: 'Protect your investment: Go VIP',
    summary: 'Multi-property inspection bundles and investor-centric reporting.',
    features: [
      '3 full + 2 quick inspections',
      'Thermal & damage assessment',
      'Electrical/water test',
      '1 VIP service included',
    ],
  },
];

export const getPackageById = (id?: string | null) => {
  if (!id) return null;
  return PACKAGES.find((p) => p.id === id || p.name.toLowerCase() === id.toLowerCase()) ?? null;
};

export default PACKAGES;
