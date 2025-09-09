import { HeroSection } from '@/components/hero-section'
import { Products } from '@/components/products'
import BannerRow from '@/components/BannerRow'
import { Custom } from '@/components/custom'
import { Quotation } from '@/components/quotation'
import BannerRowTwo from '@/components/BannerRowtwo'
import BannerRowThree from '@/components/BannerRowthree'
import BannerRowFour from '@/components/BannerRowfour'
import BannerRowFive from '@/components/BannerRowfive'
import { ClienteleSection } from '@/components/clientele-section'
import { JobCircular } from '@/components/job-circular'
import { Freelancing } from '@/components/freelancing'
import { Rent } from '@/components/rent'
import { Logistic } from '@/components/Logitstic'
import { Experts } from '@/components/experts'
import { Professional } from '@/components/professional'
import { Learning } from '@/components/learning'
import { Ebook } from '@/components/ebook'
import { DigitalResources } from '@/components/digital-resources'
import { News } from '@/components/news'
import OurServices from '@/components/our-services'

export default function HomePage() {
  return (
    <div className="pt-2 lg:pt-2">
      <HeroSection />
      <OurServices />
      <Custom />
      <Quotation />
      <BannerRow />
      <Products />
      <ClienteleSection />
      <Professional />
      <Rent />
      <Logistic />
      <BannerRowTwo />
      <Experts />
      <Freelancing />
      <JobCircular />
      <BannerRowThree />
      <Learning />
      <Ebook />
      <BannerRowFive/>
      <DigitalResources />
      <BannerRowFour />
      <News />
    </div>
  )
}
