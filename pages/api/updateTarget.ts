// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const imageBlob = await fetch(req.body.image).then((res) => res.blob());

  const formData = new FormData();
  formData.append("image", imageBlob);
  formData.append("name", req.body.targetName);
  formData.append("geometry.isRotated", "true");
  formData.append("geometry.top", "0");
  formData.append("geometry.left", "0");
  formData.append("geometry.width", "480");
  formData.append("geometry.height", "640");

  const result = await fetch(
    "https://api.8thwall.com/v1/apps/4i53Kdi7SGoEB0KzNdmFXBClTv3MIVpBdaDqW7TPLOD354uQqc6EfDFLLhzCE7xqNeE2ek/targets",
    {
      method: "POST",
      headers: {
        "X-Api-Key": process.env.IMAGE_TARGETS_API_KEY as string,
      },
      body: formData,
    }
  ).then((res) => res.json());
  console.log(result);
  res.end();
}
