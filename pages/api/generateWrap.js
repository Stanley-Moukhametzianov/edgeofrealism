import generate from '../../lib/generate';



export default async function handler(req, res) {

    const returnVal = generate(req.body);


      res.status(200).json({
          result: returnVal,
      })

}