import React from 'react'
import { Autoplay, FreeMode ,Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import CourseCard from './CourseCard'
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"

const CourseSlider = ({Courses}) =>{
  let courses= Courses; 
  // console.log(courses);
  return (
    <div>
      {
        courses?.length ? (
          <Swiper
          slidesPerView={1}
          spaceBetween={25}
          loop={Courses.length > 3} // ✅ Loop only if enough slides
          pagination={{ clickable: true }}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
          autoplay={Courses.length > 3 ? { delay: 3000, disableOnInteraction: false } : false} // ✅ Disable autoplay if not enough slides
          navigation={Courses.length > 3} // ✅ Disable navigation if not enough slides
          breakpoints={{
            1024: { slidesPerView: 3 },
          }}
        >
            {courses.map((course, index) => (
            <SwiperSlide key={index}>
              <CourseCard course={course} Height={"h-[250px]"} />
            </SwiperSlide>
           ))}
          </Swiper>
        ) : (
            <p className="text-xl text-white">No Course Found</p>
        )
      }
    </div>
  )
}

export default CourseSlider
