import ohm from 'ohm-js';
import grammar from './grammar.ohm';

/* eslint-disable no-unused-vars */
// we have unused variables in the visitor functions because Ohm uses
// function arity as a bizzare form of dynamic typechecking.
export default function quilToJSON(quilProgram) {
  const parser = ohm.grammar(grammar);
  const semantics = parser.createSemantics().addOperation('quilToJSON', {
    quil: (instructions, trailingSpace) => instructions.quilToJSON(),
    allInstr: instruction => instruction.quilToJSON(),
    instr: instruction => instruction.quilToJSON(),
    memoryDescriptor(e1, e2, e3, e4, e5, e6, e7, e8, e9, e10, e11) {
      const index = e7.quilToJSON();
      return {
        type: 'memoryDescriptor',
        register: e3.quilToJSON(),
        field: e5.quilToJSON(),
        index: index.length > 0 ? index[0] : undefined
      };
    },
    defGate(defgate, leftSpace, name, leftP, variables, rightP, colon, eol, matrix) {
      return {
        type: 'defGate',
        name: name.quilToJSON(),
        variables: variables.quilToJSON(),
        matrix: matrix.quilToJSON()
      };
    },
    variable(percent, identifier) {
      return identifier.quilToJSON();
    },
    matrix(matrixRows, lines) {
      return matrixRows.quilToJSON();
    },
    matrixRow(tab, expressions) {
      return expressions.quilToJSON();
    },
    gate(e1, e2, e3, e4, e5, e6, e7) {
      return {
        type: 'gate',
        name: e1.quilToJSON(),
        params: e3.quilToJSON(),
        qubits: e7.quilToJSON()
      };
    },
    param: e => e.quilToJSON(),
    name: identifier => identifier.quilToJSON(),
    measure(e1, e2, e3, e4, e5) {
      return {
        type: 'measure',
        qubitIndex: e3.quilToJSON(),
        address: e3.quilToJSON()
      };
    },
    addr_dereference(identifier, leftBracket, index, rightBracket) {
      return {
        type: 'dereference',
        address: identifier.quilToJSON(),
        index: index.quilToJSON()
      };
    },
    addr(identifier) {
      return {
        type: 'address',
        address: identifier.quilToJSON()
      };
    },
    qubit(int) {
      return parseInt(this.sourceString, 10);
    },
    identifier(firstLetter, continutation) {
      return this.sourceString;
    },
    int(int) {
      return parseInt(this.sourceString, 10);
    },
    expression(e) {
      return {
        type: 'expression',
        expression: this.sourceString
      };
    },
    nonemptyListOf(firstParamList, secondParamList, delimiter2) {
      return firstParamList.quilToJSON();
    }
  });

  const match = parser.match(quilProgram);
  if (match.failed()) {
    throw new Error(match.message);
  }

  return semantics(match).quilToJSON();
}
