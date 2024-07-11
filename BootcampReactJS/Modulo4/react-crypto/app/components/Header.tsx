export const Header = () => {
  return (
    <>
      <div className='flex items-center gap-3 w-3/4 h-14 bg-zinc-800 rounded-3xl'>
        <form className='flex gap-3 w-full items-center'>
          <input
            type='text'
            className='bg-transparent rounded-lg w-11/12 text-white p-3 h-full outline-none font-bold'
            placeholder='Nome'
          />

          <button
            type='submit'
            className='flex items-center justify-center text-white'
          >
            {"->"}
          </button>
        </form>
      </div>
    </>
  );
};
