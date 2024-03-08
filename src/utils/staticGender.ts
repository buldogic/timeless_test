interface GenderStatistics {
  [key: string]: number;
  'male': number;
  'female': number;
}

const calculateGenderStatistics = (genderList: string[]): GenderStatistics => {
  const genderStatistics: GenderStatistics = {
    male: 0,
    female: 0,
  };

  genderList.forEach(gender => {
    const genderLower = gender.toLowerCase();
    if (genderLower === 'male') {
      genderStatistics.male++;
    } else if (genderLower === 'female') {
      genderStatistics.female++;
    } 
  });

  return genderStatistics;
};

export default calculateGenderStatistics;

