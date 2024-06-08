import React from 'react';

interface ModalsProps {
  idModals: string;
  isSubmitting?: boolean;
  children: React.ReactNode;
  className?: string;
}

const Modals: React.FC<ModalsProps> = ({
  idModals,
  isSubmitting,
  children,
  className,
}) => {
  return (
    <dialog id={idModals} className={`modal modal-bottom tablet:modal-middle`}>
      <div className={`modal-box tablet:w-11/12 tablet:max-w-5xl ${className || ''}`}>
        <form method="dialog">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            disabled={isSubmitting}
          >
            ⨉
          </button>
        </form>
        {children}
      </div>
      {/* <form method="dialog" className="modal-backdrop">
          <button disabled={isSubmitting}>close</button>
        </form> */}
    </dialog>
  );
};

export default Modals;
