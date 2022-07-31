export interface Text {
  title: string;
  paragraphs: string[];
  assignment: string;
}
export interface IntroStep {
  title: string;
  text: Text;
}

export interface Step {
  title: string;
  overdraft: boolean;
  credit: boolean;
  constraint: boolean;
  parties: string[];
  balanceSheetDisplay: string[];
  text: Text;
}

export interface Steps {
  [key: number]: IntroStep | Step;
}
