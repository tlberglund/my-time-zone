import { DateTime } from 'luxon';

const func = async (req, context) => {
   console.log(context.geo.timezone)

   const timezone = context.geo.timezone;
   const now = DateTime.now().setZone(timezone);
   const gmtOffset = now.offset;
   const isDST = now.isInDST;

   const result = `${timezone}\n${gmtOffset}\n${isDST}\n`;

   return new Response(result, {
      headers: {
         'Content-Type': 'text/plain',
         'Content-Length': new TextEncoder().encode(result).length.toString()
      }
   });
};

export const config = {
   path: "/timezone"
};

export default func;
