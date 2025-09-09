import Image from 'next/image';
import { useRouter } from 'next/navigation';
import useCartStore from '@/store/cartStore';

interface ProductCardProps {
  id?: number;
  title: string;
  image: string;
  price: number;
  oldPrice?: number;
  discount?: string;
  rating: number;
  reviews: number;
  sold?: number;
  onClick?: () => void;
}

export default function ProductCard({ id, title, image, price, oldPrice = 150, discount = '20% Off', rating, reviews, sold = 191, onClick }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const router = useRouter();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const product = {
      id: id || Math.random(), // fallback if no id provided
      name: title,
      title,
      image,
      price,
      vendor: "Global Textiles Ltd", // default vendor
      type: "product"
    };
    
    addItem(product, 1);
    
    // Show toast notification
    if (typeof window !== 'undefined') {
      const event = new CustomEvent('showToast', {
        detail: { message: `${title} added to cart!`, type: 'success' }
      });
      window.dispatchEvent(event);
    }
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't navigate if clicking on the button
    const target = e.target as HTMLElement;
    if (target.tagName === 'BUTTON' || target.closest('button')) {
      return;
    }
    
    if (onClick) {
      onClick();
    } else if (id) {
      router.push(`/products/${id}`);
    }
  };

  return (
    <div
      className="bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col p-3 relative transition hover:shadow-md cursor-pointer"
      onClick={handleCardClick}
      tabIndex={0}
      role="button"
    >
      <div className="w-full h-44 flex items-center justify-center mb-3 relative rounded-xl overflow-hidden">
        <Image src={image} alt={title} width={300} height={180} className="object-cover w-full h-full" />
      </div>
      <div className="font-medium text-base mb-1 truncate px-1" title={title}>{title}</div>
      <div className="flex items-end gap-2 mb-1 px-1">
        <span className="text-2xl font-bold text-gray-900">৳{price}</span>
        <span className="text-gray-400 line-through text-base">৳{oldPrice}</span>
        <span className="text-sm text-red-500 font-semibold">{discount}</span>
      </div>
      <div className="flex items-center gap-2 text-sm mb-2 px-1">
        <span className="flex items-center gap-0.5">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              xmlns="http://www.w3.org/2000/svg"
              fill={i < Math.round(rating) ? '#FFD600' : 'none'}
              stroke="#FFD600"
              viewBox="0 0 24 24"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M12 17.25l-6.172 3.245 1.179-6.873L2 8.755l6.914-1.004L12 1.5l3.086 6.251L22 8.755l-5.007 4.867 1.179 6.873z"
              />
            </svg>
          ))}
        </span>
        <span className="text-gray-400">({reviews})</span>
        <span className="text-gray-300">|</span>
        <span className="text-gray-500">{sold} sold</span>
      </div>
      <button 
        onClick={handleAddToCart}
        className="w-full mt-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-full text-base transition-all shadow-sm"
      >
        Add to cart
      </button>
    </div>
  );
}
