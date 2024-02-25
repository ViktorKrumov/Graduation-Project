
export const fetchData = async () => {
    try {
      const response = await fetch('https://gist.githubusercontent.com/ViktorKrumov/f29035d526ddc0c4f74d1ac18bd9e283/raw');
      const data = await response.json();
      if (data && data.computers && Array.isArray(data.computers)) {
        return data.computers;
      } else {
        throw new Error('Fetched data is not in the expected format');
      }
    } catch (error) {
      console.error('Error fetching or processing data:', error);
      return [];
    }
  };


