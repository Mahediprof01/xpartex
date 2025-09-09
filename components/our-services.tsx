// Lucide icons used: ShoppingCart, Scissors, CheckCircle, Rocket, Truck, User, Monitor, GraduationCap, BookOpen
// https://lucide.dev/icons
import {
  ShoppingCart,
  Scissors,
  CheckCircle,
  Rocket,
  Truck,
  User,
  Monitor,
  GraduationCap,
  BookOpen,
} from 'lucide-react';

const services = [
  {
    icon: ShoppingCart,
    label: 'Retail & B2B',
    active: true,
  },
  {
    icon: Scissors,
    label: 'Customize Order',
  },
  {
    icon: CheckCircle,
    label: 'Trusted Sellers',
  },
  {
    icon: Rocket,
    label: 'Rental Service',
  },
  {
    icon: Truck,
    label: 'Logistic Support',
  },
  {
    icon: User,
    label: 'Find a Pro',
  },
  {
    icon: Monitor,
    label: 'Find Jobs',
  },
  {
    icon: GraduationCap,
    label: 'Skill Up',
  },
  {
    icon: BookOpen,
    label: 'Digital Assets',
  },
];

export default function OurServices() {
  return (
    <section className="py-6">
      <div className="container mx-auto px-4 bg-[#fafbfc] rounded-xl">
        <h2 className="text-center font-semibold text-2xl mb-6 pt-6">Our Services</h2>
        <div className="flex flex-row items-center justify-between gap-2 md:gap-4 lg:gap-8 px-2 md:px-8 pb-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.label}
                className="flex flex-col items-center min-w-[80px] gap-2"
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-1 transition-colors shadow-sm ${service.active ? 'bg-[#00c3ff] text-white shadow-[0_2px_8px_#00c3ff33]' : 'bg-[#f3f6f8] text-gray-500'}`}
                >
                  <Icon size={28} />
                </div>
                <span className="text-sm text-gray-800 text-center whitespace-nowrap">{service.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
