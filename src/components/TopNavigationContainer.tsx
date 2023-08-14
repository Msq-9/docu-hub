import React from 'react';

const TopNavigationContainer = ({
  children
}: {
  children?: JSX.Element;
}): JSX.Element => {
  return (
    <div className="bg-black h-36 mb-5 sticky z-10 top-0 lg:h-24 overflow-auto">
      {children}
    </div>
  );
};

export default TopNavigationContainer;
