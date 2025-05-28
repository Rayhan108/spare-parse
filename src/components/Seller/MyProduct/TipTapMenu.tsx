/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tooltip } from 'antd';
import { BsParagraph } from 'react-icons/bs';
import { FaBold, FaItalic, FaStrikethrough, FaAlignLeft, FaAlignCenter, FaAlignRight, FaAlignJustify, FaHeading, FaListUl } from 'react-icons/fa';
import { PiHighlighterFill } from 'react-icons/pi';

const TipTapMenu = ({ editor }: any) => {

    if (!editor) {
        return null;
    }

    const menuItems = [
        {
            action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
            isActive: editor.isActive('heading', { level: 1 }),
            icon: <FaHeading />,
            label: 'H1',
            level: 1,
        },
        {
            action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
            isActive: editor.isActive('heading', { level: 2 }),
            icon: <FaHeading />,
            label: 'H2',
            level: 2,
        },
        {
            action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
            isActive: editor.isActive('heading', { level: 3 }),
            icon: <FaHeading />,
            label: 'H3',
            level: 3,
        },
        {
            action: () => editor.chain().focus().setParagraph().run(),
            isActive: editor.isActive('paragraph'),
            icon: <BsParagraph />,
            label: 'Paragraph',
            level: 'p',
        },
        {
            action: () => editor.chain().focus().toggleBold().run(),
            isActive: editor.isActive('bold'),
            icon: <FaBold />,
            label: 'Bold',
        },
        {
            action: () => editor.chain().focus().toggleItalic().run(),
            isActive: editor.isActive('italic'),
            icon: <FaItalic />,
            label: 'Italic',
        },
        {
            action: () => editor.chain().focus().toggleStrike().run(),
            isActive: editor.isActive('strike'),
            icon: <FaStrikethrough />,
            label: 'Strike',
        },
        {
            action: () => editor.chain().focus().toggleHighlight().run(),
            isActive: editor.isActive('highlight'),
            icon: <PiHighlighterFill />,
            label: 'Highlight',
        },
        {
            action: () => editor.chain().focus().setTextAlign('left').run(),
            isActive: editor.isActive({ textAlign: 'left' }),
            icon: <FaAlignLeft />,
            label: 'Left',
        },
        {
            action: () => editor.chain().focus().setTextAlign('center').run(),
            isActive: editor.isActive({ textAlign: 'center' }),
            icon: <FaAlignCenter />,
            label: 'Center',
        },
        {
            action: () => editor.chain().focus().setTextAlign('right').run(),
            isActive: editor.isActive({ textAlign: 'right' }),
            icon: <FaAlignRight />,
            label: 'Right',
        },
        {
            action: () => editor.chain().focus().setTextAlign('justify').run(),
            isActive: editor.isActive({ textAlign: 'justify' }),
            icon: <FaAlignJustify />,
            label: 'Justify',
        },
        {
            action: () => editor.chain().focus().toggleBulletList().run(), // Action for Bullet List
            isActive: editor.isActive('bulletList'),
            icon: <FaListUl />, // Bullet List icon
            label: 'Bullet List',
        }
    ];

    return (
        <div className=" mb-4">
            <div className=" flex space-x-2">
                {menuItems.map((item, index) => (
                    <Tooltip key={index} title={item.label}>
                        <button
                            onClick={item.action}
                            className={`flex items-center justify-center p-2 cursor-pointer rounded-md ${item.isActive ? ' bg-[#000000be] text-white' : 'bg-gray-100 hover:bg-gray-200'} transition-all duration-200`}
                        >
                            <span className="">{item.icon}</span>
                            {/* {item.label} */}
                        </button>
                    </Tooltip>
                ))}
            </div>
        </div>
    );
};

export default TipTapMenu;
