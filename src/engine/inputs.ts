export type KeyboardInputs = {
  ArrowLeft: boolean;
  ArrowRight: boolean;
  ArrowUp: boolean;
  ArrowDown: boolean;
  Minus: boolean;
  Equal: boolean;
  KeyH: boolean;
  KeyC: boolean;
  Space: boolean;
};

export type MouseInputs = {
  is_dragging: boolean;
  drag_x: number;
  drag_y: number;
  wheel: number;
};

export type Inputs = {
  kb: KeyboardInputs;
  mouse: MouseInputs;
};

export const create_inputs = (element: HTMLCanvasElement): Inputs => {
  const kb: KeyboardInputs = {
    ArrowLeft: false,
    ArrowRight: false,
    ArrowUp: false,
    ArrowDown: false,
    Minus: false,
    Equal: false,
    KeyH: false,
    KeyC: false,
    Space: false,
  };

  const mouse: MouseInputs = {
    is_dragging: false,
    drag_x: 0,
    drag_y: 0,
    wheel: 0,
  };

  window.addEventListener('keydown', event => {
    if (event.ctrlKey || event.metaKey || event.altKey) {
      return;
    }

    const code = event.code;

    if (code === 'ArrowLeft') {
      kb.ArrowLeft = true;
    } else if (code === 'ArrowRight') {
      kb.ArrowRight = true;
    } else if (code === 'ArrowUp') {
      kb.ArrowUp = true;
    } else if (code === 'ArrowDown') {
      kb.ArrowDown = true;
    } else if (code === 'Minus') {
      kb.Minus = true;
    } else if (code === 'Equal') {
      kb.Equal = true;
    } else if (code === 'KeyH') {
      kb.KeyH = true;
    } else if (code === 'KeyC') {
      kb.KeyC = true;
    } else if (code === 'Space') {
      event.preventDefault();
      kb.Space = true;
    }
  });

  window.addEventListener('keyup', event => {
    const code = event.code;

    if (code === 'ArrowLeft') {
      kb.ArrowLeft = false;
    } else if (code === 'ArrowRight') {
      kb.ArrowRight = false;
    } else if (code === 'ArrowUp') {
      kb.ArrowUp = false;
    } else if (code === 'ArrowDown') {
      kb.ArrowDown = false;
    } else if (code === 'Minus') {
      kb.Minus = false;
    } else if (code === 'Equal') {
      kb.Equal = false;
    } else if (code === 'KeyH') {
      kb.KeyH = false;
    } else if (code === 'KeyC') {
      kb.KeyC = false;
    } else if (code === 'Space') {
      kb.Space = false;
    }
  });

  element.addEventListener('mousedown', event => {
    if (event.button === 0) {
      mouse.is_dragging = true;
    }
  });

  document.addEventListener('mousemove', event => {
    if (mouse.is_dragging === false) {
      return;
    }

    mouse.drag_x += event.movementX;
    mouse.drag_y += event.movementY;
  });

  document.addEventListener('mouseup', () => {
    mouse.is_dragging = false;
  });

  document.addEventListener('wheel', event => {
    mouse.wheel += event.deltaY;
  });

  return { kb, mouse };
};
