import { redirect } from 'next/navigation';
import React from 'react'

function Page() {
  redirect('/findjob');
  return;
}

export default Page