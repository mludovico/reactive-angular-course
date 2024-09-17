export interface Course {
  id: number,
  url: string,
  description: string,
  longDescription: string,
  category: string,
  seqNo: number,
  totalLessons: number,
  comingSoon: boolean,
  isNew: boolean,
  isOngoing: boolean,
  visibleFrom: string,
  iconUrl: string,
  courseListIcon: string,
  couponCode: string,
  archived: boolean,
  releaseAt: string
}

export function sortCoursesBySeqNo(c1: Course, c2: Course) {
  return c1.seqNo - c2.seqNo;
}
