import ohm from 'ohm-js';
import grammar from './grammar.ohm';

const unpackOptional = optional => {
  const unpacked = optional.quilToJSON();
  if (unpacked.length > 0) {
    return unpacked[0];
  }
  return undefined;
};

/* eslint-disable no-unused-vars */
// we have unused variables in the visitor functions because Ohm uses
// function arity as a bizzare form of dynamic typechecking.
export default function quilToJSON(quilProgram) {
  const parser = ohm.grammar(grammar);
  const semantics = parser.createSemantics().addOperation('quilToJSON', {
    quil: (instructions, trailingSpace) => instructions.quilToJSON(),
    allInstr: instruction => instruction.quilToJSON(),
    instr: instruction => instruction.quilToJSON(),
    memoryDescriptor(
      declare,
      identifierSpace1,
      register,
      identifierSpace2,
      field,
      leftBracket,
      index,
      rightBracket,
      sharing,
      sharingIdentifier,
      sharingOffsetDescriptor
    ) {
      const parsedSharing = unpackOptional(sharingIdentifier);
      return {
        type: 'memoryDescriptor',
        register: register.quilToJSON(),
        field: field.quilToJSON(),
        index: index.quilToJSON(),
        sharing: parsedSharing
          ? {
              register: parsedSharing,
              offset: sharingOffsetDescriptor.quilToJSON()
            }
          : undefined
      };
    },
    offsetDescriptor(offset, leftSpace, index, rightSpace, register) {
      return {
        type: 'offsetDescriptor',
        index: index.quilToJSON(),
        register: register.quilToJSON()
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
    defCircuit(
      defcircuit,
      space,
      name,
      leftP,
      variables,
      rightP,
      variableSpaces,
      qubitVariables,
      colon,
      eol,
      circuit
    ) {
      return {
        type: 'defCircuit',
        name: name.quilToJSON(),
        variables: variables.quilToJSON(),
        qubitVariables: qubitVariables.quilToJSON(),
        circuit: circuit.quilToJSON()
      };
    },
    qubitVariable(identifier) {
      return identifier.quilToJSON();
    },
    circuitQubit(qubit) {
      return qubit.quilToJSON();
    },
    circuitGate(name, lParen, params, rParen, space, circuitQubits) {
      return {
        type: 'circuitGate',
        name: name.quilToJSON(),
        params: params.quilToJSON(),
        qubits: circuitQubits.quilToJSON()
      };
    },
    circuitMeasure(measure, leftSpace, circuitQubit, rightSpace, address) {
      return {
        type: 'circuitMeasure',
        qubit: circuitQubit.quilToJSON(),
        address: address.quilToJSON()
      };
    },
    circuitResetState(reset, circuitQubit) {
      return {
        type: 'circuitResetState',
        qubit: circuitQubit.quilToJSON()
      };
    },
    circuitInstr: instr => instr.quilToJSON(),
    circuit(tabs, circuitInstrs, eols) {
      return circuitInstrs.quilToJSON();
    },
    defLabel(deflabel, space, label) {
      return {
        type: 'defLabel',
        label: label.quilToJSON()
      };
    },
    label(at, identifier) {
      return identifier.quilToJSON();
    },
    halt(halt) {
      return {
        type: 'halt'
      };
    },
    jump(jump, space, label) {
      return {
        type: 'jump',
        label: label.quilToJSON()
      };
    },
    jumpWhen(jumpWhen, leftSpace, label, rightSpace, address) {
      return {
        type: 'jumpWhen',
        label: label.quilToJSON(),
        address: address.quilToJSON()
      };
    },
    jumpUnless(jumpUnless, leftSpace, label, rightSpace, address) {
      return {
        type: 'jumpUnless',
        label: label.quilToJSON(),
        address: address.quilToJSON()
      };
    },
    resetState(reset, space, qubit) {},
    nonemptyListOf(x, sep, xs) {
      return [x.quilToJSON()].concat(xs.quilToJSON());
    }
  });

  const match = parser.match(quilProgram);
  if (match.failed()) {
    throw new Error(match.message);
  }

  return semantics(match).quilToJSON();
}
