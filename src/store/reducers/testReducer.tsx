
interface Action {
  type: string;
  payload: object;
}

interface State {
  loading: boolean;
  addRelatedPerson:any;
}

const intialState = {
  loading: false,
  addRelatedPerson:[]
};

export default (state: State = intialState, action: Action) => {
  
  switch (action.type) {
    case 'TEST':
      return {
        ...state,
        addRelatedPerson: [...state.addRelatedPerson, action.payload]
      };

    default:
      return state;
  }
};