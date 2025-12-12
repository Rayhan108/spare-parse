import Hero from "@/components/Home/Hero";
import SelectYourVehicle from "@/components/Home/SelectYourVehicle";
import Category from "@/components/Home/Category";
import ExploreProducts from "@/components/Home/ExploreProducts";
import NewArrival from "@/components/Home/NewArrival";
import ServiceFeatures from "@/components/Home/ServiceFeatures";

export default function Home() {
  return (
    <div className=" px-4 md:px-0">
      <Hero></Hero>
      <SelectYourVehicle></SelectYourVehicle>
      <Category></Category>
      <ExploreProducts></ExploreProducts>
      <NewArrival></NewArrival>
      <ServiceFeatures></ServiceFeatures>
    </div>
  );
}
