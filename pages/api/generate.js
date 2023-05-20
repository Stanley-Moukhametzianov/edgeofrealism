
import fetchData from '../../lib/fetchData';

export default async function handler(req, res) {
  try {

     console.log('here');

    const data = req.body;

    const imageURls = await fetchData(data);

    console.log('here');

    res.status(200).json({
      result: [imageURls],
    })



  } catch (e) {
    res.status(500).json({
      result: 'Error. Could not generate a poem.'
    })
  }


}


