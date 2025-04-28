import Category from "@/components/Home/Category";
import ExploreProducts from "@/components/Home/ExploreProducts";
import Hero from "@/components/Home/Hero";
import SelectYourVehicle from "@/components/Home/SelectYourVehicle";

export default function Home() {
  return (
    <div className="">
      <Hero></Hero>
      <SelectYourVehicle></SelectYourVehicle>
      <Category></Category>
      <ExploreProducts></ExploreProducts>
    </div>
  );
}
