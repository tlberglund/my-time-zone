import { DateTime } from 'luxon';

const func = async (req, context) => {
   console.log(context.geo.timezone)

   const timezone = context.geo.timezone;
   const now = DateTime.now().setZone(timezone);
   const gmtOffset = now.offset;
   const isDST = now.isInDST;

   return new Response(gmtOffset);
};

export const config = {
   path: "/timezone"
};

export default func;
