import { twMerge } from 'tailwind-merge';

type ClassNameValue = string | null | undefined | 0 | false | ClassNameValue[];

export default function tw(...classLists: ClassNameValue[]) {
  return twMerge(...classLists);
}
