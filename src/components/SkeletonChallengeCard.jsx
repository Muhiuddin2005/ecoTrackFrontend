import React from "react";
import Skeleton from "react-loading-skeleton";

const SkeletonChallengeCard = () => {
  return (
    <div className="bg-base-100 border border-base-200/60 rounded-lg shadow p-4 flex flex-col justify-between">
      <Skeleton height={160} className="mb-4 rounded" />
      <Skeleton height={20} width="80%" className="mb-2" />
      <Skeleton height={14} width="60%" className="mb-2" />
      <Skeleton height={14} width="70%" className="mb-2" />
      <Skeleton height={14} width="60%" className="mb-2" />
      <Skeleton height={14} width="50%" className="mb-4" />
      <Skeleton height={32} width="100%" borderRadius={6} />
    </div>
  );
};

export default SkeletonChallengeCard;
