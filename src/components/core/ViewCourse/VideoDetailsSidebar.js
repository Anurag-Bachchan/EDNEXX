import { useEffect, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import IconBtn from "../../common/IconBtn";

export default function VideoDetailsSidebar({ setReviewModal }) {
  const [activeStatus, setActiveStatus] = useState("");
  const [videoBarActive, setVideoBarActive] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { sectionId, subSectionId } = useParams();
  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse);
  console.log(courseSectionData)

  useEffect(() => {
    if (!courseSectionData.length) return;
    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );
    const currentSubSectionIndx =
      courseSectionData?.[currentSectionIndx]?.subSection.findIndex(
        (data) => data._id === subSectionId
      );
    const activeSubSectionId =
      courseSectionData[currentSectionIndx]?.subSection?.[currentSubSectionIndx]
        ?._id;
    setActiveStatus(courseSectionData?.[currentSectionIndx]?._id);
    setVideoBarActive(activeSubSectionId);
  }, [courseSectionData, sectionId, subSectionId]);

  return (
    <>
      <div className="flex flex-col md:h-[100vh] h-[65vh] w-[120vw] max-w-[350px] border-r-[1px] border-r-slate-700 bg-slate-800">
        <div className="px-5 py-3 border-b border-slate-600 text-lg font-bold text-slate-200">
          <div className="flex items-center justify-between">
            <div
              onClick={() => {
                navigate(`/dashboard/enrolled-courses`);
              }}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-700 hover:scale-90"
              title="back"
            >
              <IoIosArrowBack size={24} />
            </div>
            <IconBtn
              text="Add Review"
              customClasses="ml-auto"
              onclick={() => setReviewModal(true)}
            />
          </div>
          <div className="mt-2">
            <p>{courseEntireData?.courseName}</p>
            <p className="text-sm font-semibold text-slate-50">
              {completedLectures?.length} / {totalNoOfLectures}
            </p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {courseSectionData.map((course, index) => (
            <div
              className="mt-2 cursor-pointer text-sm text-slate-50"
              onClick={() => setActiveStatus(course?._id)}
              key={index}
            >
              <div className="flex justify-between bg-slate-600 px-5 py-4">
                <div className="w-4/5 font-semibold">
                  {course?.sectionName}
                </div>
                <div className="flex items-center gap-3">
                  <BsChevronDown
                    className={`transform transition-transform ${
                      activeStatus === course?._id ? "rotate-0" : "rotate-180"
                    }`}
                  />
                </div>
              </div>

              {activeStatus === course?._id && (
                <div className="transition-height duration-500 ease-in-out">
                  {course.subSection.map((topic, i) => (
                    <div
                      className={`flex gap-3 px-5 py-2 ${
                        videoBarActive === topic._id
                          ? "bg-yellow-200 font-semibold text-slate-800"
                          : "hover:bg-slate-900"
                      }`}
                      key={i}
                      onClick={() => {
                        navigate(
                          `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
                        );
                        setVideoBarActive(topic._id);
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={completedLectures.includes(topic?._id)}
                        onChange={() => {}}
                      />
                      {topic.title}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}