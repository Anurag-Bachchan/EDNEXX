import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiConnector } from '../components/Services/apiConnector';
import { categories } from '../components/Services/apis';
import { CategoryPageDetails } from '../components/Services/operations/PageComponentsAPI';
import CourseCard from '../components/core/Catalog/CourseCard';
import CourseSlider from '../components/core/Catalog/CourseSlider';
import Error from './Error';
import { useSelector } from "react-redux";
import Footer from './Footer';

const Catalog = () => {
  const { loading } = useSelector((state) => state.profile);
  const {catalogName} = useParams();
  const [catalogPageData, setCatalogPageData]= useState(null);
  const [categoryId, setCategoryId]= useState("");
  const [active, setActive] = useState(1);

   // Fetch all categories
   useEffect(() => {
    const getCategories = async () => {
        try {
            // console.log("Fetching categories for catalogName:", catalogName);
            const res = await apiConnector("GET", categories.CATEGORIES_API);
            console.log("Categories API response:", res);

            const transformedCatalogName = catalogName.split(" ").join("-").toLowerCase();
            // console.log("Transformed catalogName:", transformedCatalogName);

            const category = res?.data?.allTags?.find(
                (ct) => {
                    const transformedCategoryName = ct.name.split(" ").join("-").toLowerCase();
                    // console.log(`Comparing with category name: ${transformedCategoryName}`);
                    return transformedCategoryName === transformedCatalogName;
                }
            );
            const category_id = category?._id;

            // console.log("Resolved category_id:", category_id);
            if (!category_id) {
                throw new Error("Category not found");
            }
            setCategoryId(category_id);
        } catch (error) {
            console.error("Error fetching category ID:", error.message);
        }
     };
    getCategories();
    }, [catalogName]);

  useEffect(()=>{
     const getCategoryDetails = async()=>{
        const res =  await CategoryPageDetails(categoryId);
        console.log(res);
        setCatalogPageData(res);
     }
     if(categoryId){
        getCategoryDetails();
     }
   },[categoryId]);

   if (loading || !catalogPageData) {
    return (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            <div className="spinner"></div>
        </div>
    );
  }

  if (!loading && !catalogPageData.success) {
        return <Error />;
  }
  
  return (
    <>
      <div className='w-11/12 text-stone-400'>
       {/* Hero Section */}
       <div className="box-content bg-slate-900 px-4 shadow-[0_0_20px_0] shadow-[#c88e68]">
                <div className="mx-auto flex min-h-[260px]  max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent">
                    <p className="text-sm text-slate-300">
                        {`Home / Catalog / `}
                        <span className="text-yellow-200">
                            {catalogPageData?.data?.selectedCategory?.name}
                        </span>
                    </p>
                    <p className="text-3xl text-white">
                        {catalogPageData?.data?.selectedCategory?.name}
                    </p>
                    <p className="max-w-[870px] text-slate-200">
                        {catalogPageData?.data?.selectedCategory?.description}
                    </p>
                </div>
       </div>

         
            {/* Section 1 */}
            <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                <div className="section_heading text-2xl font-semibold">Courses to get you started</div>
                <div className="my-4 flex border-b border-b-slate-600 text-base">
                    <p
                        className={`px-4 py-2 ${
                            active === 1
                                ? "border-b border-b-yellow-200 text-yellow-25"
                                : "text-white"
                        } cursor-pointer`}
                        onClick={() => setActive(1)}
                    >
                        Most Popular
                    </p>
                    <p
                        className={`px-4 py-2 ${
                            active === 2
                                ? "border-b border-b-yellow-200 text-yellow-25"
                                : "text-white"
                        } cursor-pointer`}
                        onClick={() => setActive(2)}
                    >
                        New
                    </p>
                </div>
                <div>
                    <CourseSlider
                        Courses={catalogPageData?.data?.selectedCategory?.course}
                    />
                </div>
            </div>

            {/* Section 2 */}
            <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                <div className="section_heading text-2xl font-semibold">
                    Top courses in {catalogPageData?.data?.differentCategories?.name}
                </div>
                <div className="py-8">
                    <CourseSlider
                        Courses={catalogPageData?.data?.differentCategories?.course}
                    />
                </div>
            </div>


         <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
            <div className="section_heading text-2xl font-semibold">Frequently Bought Courses</div>
            <div className='py-8'>
                {catalogPageData?.data?.mostSellingCourses[0] ? 
                  (
                    <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
                    {
                      catalogPageData.data.mostSellingCourses.slice(0,4).map((course,index)=>(
                        <CourseCard course={course} key={index} Height={"h-[400px]"}/>
                      ))
                    }
                   </div>
                  ) : <p className='text-xl text-white'>No Course Found</p>
                
                }
            </div>
         </div>
         </div>
         <Footer/>

    </>
  )
}

export default Catalog
