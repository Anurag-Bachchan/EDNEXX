import React, { useEffect, useState } from 'react'
import getAvgRating from '../../common/avgRating';
import RatingStars from '../../common/RatingStars';
import { Link } from 'react-router-dom';

const CourseCard = ({course, Height}) => {
    const [avgReviewCount, setAvgReviewCount]= useState(0);
    // console.log(course);

    useEffect(()=>{
      const count = getAvgRating(course.ratingAndReviews);
      setAvgReviewCount(count);
    },[course])

  return (
    <div>
        <Link to={`/courses/${course._id}`}>
        <div className="">
          <div className="rounded-lg">
            <img
              src={course?.thumbnail}
              alt="course thumnail"
              className={`${Height} w-full rounded-xl object-cover `}
            />
          </div>
          <div className="flex flex-col gap-2 px-1 py-3">
            <p className="text-xl text-white">{course?.courseName}</p>
            <p className="text-sm text-white">
              {course?.instructor?.firstName} {course?.instructor?.lastName}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-yellow-500">{avgReviewCount || 0}</span>
              <RatingStars Review_Count={avgReviewCount} />
              <span className="text-slate-400">
                {course?.ratingAndReviews?.length} Ratings
              </span>
            </div>
            <p className="text-xl text-white">Rs. {course?.price}</p>
          </div>
        </div>
      </Link>

    </div>
  )
}

export default CourseCard
