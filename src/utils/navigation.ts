// src/utils/navigation.ts
'use client';

import {useRouter as useNextRouter, usePathname as useNextPathname} from 'next/navigation';
import Link from 'next/link';

// ✅ Export these so your Navbar or other components can use them
export const useRouter = () => useNextRouter();
export const usePathname = () => useNextPathname();
export {Link};
