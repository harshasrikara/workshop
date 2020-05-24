export interface user
  extends firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData> {
  readonly isAdmin?: boolean;
}

export interface workshopFirebase
  extends firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData> {
  //uses the stricter QueryDocumentSnapshot that quarantees that the fields cannot be null, can optionally be downcasted to DocumentSnapshot, read here for more information https://stackoverflow.com/questions/49859954/firestore-difference-between-documentsnapshot-and-querydocumentsnapshot
  Date?: Date;
  Level_Descriptions?: string[];
  Level_Titles?: string[];
  Number_Of_Levels?: number;
  Workshop_ID?: string;
  Workshop_Name?: string;
}

export interface studentsAtWorkshopFirebase
  extends firebase.firestore.QueryDocumentSnapshot<
    firebase.firestore.DocumentData
  > {
  //uses the stricter QueryDocumentSnapshot that quarantees that the fields cannot be null, can optionally be downcasted to DocumentSnapshot
  readonly Enabled?: boolean;
  readonly Level_Enabled?: number;
  readonly Workshop_ID?: string;
  readonly testProgress?: any; //need help on this
}

//super strict definition of data required for the front-end, no optional parameters
export interface studentsAtWorkshop {
  Students: string[];
  Progress: number[];
  Enabled: boolean;
  Workshop_ID: string;
  Level_Enabled: number;
}

//super strict definition of data required for the front-end, no optional parameters
//this coincidentally happens to be the exact same as workshopFirebase but none of the fields are optional
export interface workshop {
  Date: Date;
  Level_Descriptions: string[];
  Level_Titles: string[];
  Number_Of_Levels: number;
  Workshop_ID: string;
  Workshop_Name: string;
}
