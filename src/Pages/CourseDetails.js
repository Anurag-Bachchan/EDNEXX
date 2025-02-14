import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { buyCourse } from './StudentDetailsAPI';
import { fetchCourseDetails } from '../components/Services/operations/courseDetailAPI';
import getAvgRating from '../components/common/avgRating';
import ConfirmModal from '../components/common/ConfirmModal';
import Error from './Error';
import RatingStars from '../components/common/RatingStars';
import { formatDate } from '../components/Services/formatDate';
import CourseDetailsCard from '../components/core/Course/CourseDetailsCard';
import CourseAccordionBar from '../components/core/Course/CourseAccordionBar';
import { BiInfoCircle } from "react-icons/bi";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import Footer from './Footer';

function CourseDetails() {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.profile);
  const { paymentLoading } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Getting courseId from url parameter
  const { courseId } = useParams();

  // Declare a state to save the course details
  const [response, setResponse] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);

  // Fetch course details
  useEffect(() => {
    (async () => {
      try {
        const res = await fetchCourseDetails(courseId);
        console.log("Course details response:", res); // Debugging line
        setResponse(res.data[0]);
      } catch (error) {
        console.log("Could not fetch Course Details");
      }
    })();
  }, [courseId]);

  // Calculate average review count
  const [avgReviewCount, setAvgReviewCount] = useState(0);
  useEffect(() => {
    if (response?.ratingAndReviews) {
      const count = getAvgRating(response.ratingAndReviews);
      setAvgReviewCount(count);
    }
  }, [response]);

  // Handle active accordion state
  const [isActive, setIsActive] = useState([]);
  const handleActive = (id) => {
    setIsActive(
      !isActive.includes(id)
        ? isActive.concat([id])
        : isActive.filter((e) => e !== id)
    );
  };

  // Calculate total number of lectures
  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
  useEffect(() => {
    if (response?.courseContent) {
      let lectures = 0;
      response.courseContent.forEach((sec) => {
        lectures += sec.subSection.length || 0;
      });
      setTotalNoOfLectures(lectures);
    }
  }, [response]);

  // Loading state
  if (loading || !response) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  // Error state
  if (!response) {
    return <Error />;
  }

  // Destructure response
  const {
    courseName,
    courseDescription,
    thumbnail,
    price,
    whatYouWillLearn,
    courseContent,
    ratingAndReviews,
    instructor,
    studentsEnrolled,
    createdAt,
  } = response;

  // Handle buy course
  const handleBuyCourse = () => {
    if (token) {
      buyCourse(token, [courseId], user, navigate, dispatch);
      return;
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to Purchase Course.",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    });
  };

  // Payment loading state
  if (paymentLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <>
      <div>
      <div className={`relative w-full bg-slate-900`}>
        {/* Hero Section */}
        <div className="mx-auto box-content px-4 lg:w-[1260px] 2xl:relative">
          <div className="mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]">
            <div className={`z-30 my-5 flex flex-col justify-center gap-4 py-5 text-lg text-white`}>
              <div>
                <p className="text-4xl font-bold text-white sm:text-[42px]">
                  {courseName}
                </p>
              </div>
              <p className={`text-slate-200`}>{courseDescription}</p>
              <div className="text-md flex flex-wrap items-center gap-2">
                <span className="text-yellow-200">{avgReviewCount}</span>
                <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
                <span>{`(${ratingAndReviews.length} reviews)`}</span>
                <span>{`${studentsEnrolled.length} students enrolled`}</span>
              </div>
              <div>
                <p className="">
                  Created By {`${instructor.firstName} ${instructor.lastName}`}
                </p>
              </div>
              <div className="flex flex-wrap gap-5 text-lg">
                <p className="flex items-center gap-2">
                  {" "}
                  <BiInfoCircle /> Created at {formatDate(createdAt)}
                </p>
                <p className="flex items-center gap-2">
                  {" "}
                  <HiOutlineGlobeAlt /> English
                </p>
              </div>
            </div>
          </div>
          {/* Courses Card laptop*/}
          <div className="shadow-[0_0_20px_0] shadow-[#c6c868] right-14 top-[60px] mx-auto min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0 absolute hidden lg:block ml-28">
            <CourseDetailsCard
              course={response}
              setConfirmationModal={setConfirmationModal}
              handleBuyCourse={handleBuyCourse}
            />
          </div>
        </div>
      </div>
      <div className="mx-auto box-content px-4 text-start text-white lg:w-[1260px]">
        <div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]">
          {/* What will you learn section */}
          <div className="my-8 border border-slate-600 p-8">
            <p className="text-3xl font-semibold">What you'll learn</p>
            <div className="mt-5">{whatYouWillLearn}</div>
          </div>

          {/* Course Content Section */}
          <div className="max-w-[830px]">
            <div className="flex flex-col gap-3">
              <p className="text-[28px] font-semibold">Course Content</p>
              <div className="flex flex-wrap justify-between gap-2">
                <div className="flex gap-2">
                  <span>
                    {courseContent.length} {`section(s)`}
                  </span>
                  <span>
                    {totalNoOfLectures} {`lecture(s)`}
                  </span>
                  {/* <span>{response.totalDuration} total length</span> */}
                </div>
                <div>
                  <button
                    className="text-yellow-200"
                    onClick={() => setIsActive([])}
                  >
                    Collapse all sections
                  </button>
                </div>
              </div>
            </div>

            {/* Course Details Accordion */}
            <div className="py-4">
              {courseContent?.map((course, index) => (
                <CourseAccordionBar
                  course={course}
                  key={index}
                  isActive={isActive}
                  handleActive={handleActive}
                />
              ))}
            </div>

            {/* Author Details */}
            <div className="lg:mb-12 mb-0 py-2">
              <p className="text-[28px] font-semibold">Author</p>
              <div className="flex items-center gap-4 py-3">
                <img
                  src={
                    instructor.image
                      ? instructor.image
                      : `https://api.dicebear.com/5.x/initials/svg?seed=${instructor.firstName} ${instructor.lastName}`
                  }
                  alt="Author"
                  className="h-14 w-14 rounded-full object-cover"
                />
                <p className="text-lg">{`${instructor.firstName} ${instructor.lastName}`}</p>
              </div>
              <p className="text-white">
                {instructor?.additionalDetails?.about}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Card mobile*/}
      <div className="mb-[15vh] p-3 mx-auto min-h-[600px] w-full md:w-1/2 lg:w-1/3 max-w-[410px] translate-y-24 md:translate-y-0 lg:hidden">
        <CourseDetailsCard
          course={response}
          setConfirmationModal={setConfirmationModal}
          handleBuyCourse={handleBuyCourse}
        />
      </div>

      </div>
      <Footer />
      {confirmationModal && <ConfirmModal modalData={confirmationModal} />}
    </>
  );
}

export default CourseDetails;