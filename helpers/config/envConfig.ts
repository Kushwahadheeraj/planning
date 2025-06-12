export const getBaseUrl = (): string => {
  // deploylink || locallink
  // return (
  //   process.env.BACKEND_URL ||
  //   "https://backend-for-event-b03i2adhl-rizwanulwahid612-gmailcom.vercel.app/api/v1"
  // );
  return process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3005/api/v1";
  // https://backend-for-event-dyhl9sx57-rizwanulwahid612-gmailcom.vercel.app/api/v1/
};
