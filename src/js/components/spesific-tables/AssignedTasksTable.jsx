import React from 'react'
import { useTasks } from '../../context/TasksContext'
import Tooltip from '../items/Tooltip';

export default function AssignedTasksTable() {

  const { assigned_tasks_table_columns, all_tasks, all_currents, all_users, completeStep, cancelStep, completeTask, reOpenTask, editTask, cancelTask } = useTasks();

  return (
    
    <div className="shadow-table overflow-auto max-h-[730px]">
      <table className="w-full text-sm text-left text-pine_tree">

        <thead>
          <tr>
            {assigned_tasks_table_columns.map((c, i) => {
              let cls = "p-2 h-10 font-bold text-xs sticky top-0 text-prussian_blue bg-steel_blue_light z-10"
              if(c === "SİPARİŞ DURUMU") cls= "p-2 h-10 font-bold text-xs text-center sticky top-0 text-prussian_blue bg-steel_blue_light z-10"

              return (
                <th key={i} className={cls}>
                  {c}
                </th>
              )
            })}
            <th scope="col" className="p-2 h-10 w-9 font-bold text-xs sticky top-0 text-prussian_blue bg-steel_blue_light z-10">
              <span className="sr-only">Düzenle</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {all_tasks.map((p, i) => {

            let cur_name = "";
            for (let c of all_currents) {
              if (p.details.order.current_id === c.details.id) {
                cur_name = c.details.name
              }
            }

            let responsible_username = "";
            for (let u of all_users) {
              if (p.details.current_step.responsible_username === u.username) {
                responsible_username = u.data.displayname
              }
            }

            if (Date.now() > (new Date(p.details.current_step.planned_finish_date)).getTime()) {
              if ((p.details.state !== "Tamamlandı") && (p.details.state !== "İptal Edildi")) { p.details.state = "Gecikti" }
            }

            let row_cls = "bg-gray-100 border-b h-9 border-alica_blue hover:bg-alica_blue_middle transition duration-300"
            if (p.details.state === "İptal Edildi") row_cls = "bg-red-400 border-b h-9 border-alica_blue hover:bg-red-500 transition duration-300"
            else if (p.details.state === "Tamamlandı") row_cls = "bg-green-400 border-b h-9 border-alica_blue hover:bg-green-500 transition duration-300"
            else if (p.details.state === "Gecikti") row_cls = "bg-gray-400 border-b h-9 border-alica_blue hover:bg-gray-500 transition duration-300"
            
            return (
              <tr key={i} className={row_cls}>
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px]">
                  {p.details.order.id}
                </td>
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px]">
                  {p.details.order.current_id}
                </td>
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px]">
                  {cur_name}
                </td>
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px]">
                  {p.details.order.date.split("T")[0]}
                </td>
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px]">
                  {p.details.order.delivery_date.split("T")[0]}
                </td>
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px]">
                  {p.details.current_step.name}
                </td>
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px]">
                  {p.details.current_step.planned_finish_date.split("T")[0]}
                </td>
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px]">
                  {responsible_username}
                </td>
                <td className="py-[0.20rem] px-2 text-prussian_blue text-[13px] font-bold text-center">
                  {p.details.state}
                </td>
                <td className="py-[0.20rem] px-1 text-prussian_blue text-right">
                  <div className="dropdown inline-block">
                    <button type='button' onClick={() => {}} className='save-btn shadow-md px-2 w-fit rounded-[4px] active:scale-90'><i className="fa-solid fa-bars"></i></button>
                    <ul className="dropdown-menu duration-500 shadow-xl absolute hidden text-oxford_blue z-[2] right-10 w-max text-left">
                      
                      <li onClick={() => completeStep(p.id)} className="bg-steel_blue_light border border-queen_blue text-sky-700 transition duration-200 hover:bg-alica_blue py-1 px-3 block truncate border-b-0 cursor-pointer rounded-t">
                        <i className="fa-solid fa-check mr-2 w-4 text-center text-sky-700"></i>İşlemi Tamamla
                      </li>
                      <li onClick={() => cancelStep(p.id)} className="bg-steel_blue_light border border-queen_blue text-orange-500 transition duration-200 hover:bg-alica_blue py-1 px-3 block truncate border-b-0 cursor-pointer">
                        <i className="fa-solid fa-xmark mr-2 w-4 text-center text-orange-500"></i>İşlemi İptal Et
                      </li>
                      <li onClick={() => completeTask(p.id)} className="bg-steel_blue_light border border-queen_blue text-green-700 transition duration-200 hover:bg-alica_blue py-1 px-3 block truncate border-b-0 cursor-pointer">
                        <i className="fa-solid fa-square-check mr-2 w-4 text-center text-green-700"></i>Görevi Tamamla
                      </li>
                      <li onClick={() => reOpenTask(p.id)} className="bg-steel_blue_light border border-queen_blue text-indigo-700 transition duration-200 hover:bg-alica_blue py-1 px-3 block truncate border-b-0 cursor-pointer">
                        <i className="fa-solid fa-repeat mr-2 w-4 text-center text-indigo-700"></i>Görevi Baştan Başlat
                      </li>
                      <li onClick={() => editTask(p.id)} className="bg-steel_blue_light border border-queen_blue text-yellow-500 transition duration-200 hover:bg-alica_blue py-1 px-3 block truncate border-b-0 cursor-pointer">
                        <i className="fa-solid fa-pen-to-square mr-2 w-4 text-center text-yellow-500"></i>Görevi Düzenle
                      </li>
                      <li onClick={() => cancelTask(p.id)} className="bg-steel_blue_light border border-queen_blue text-red-600 transition duration-200 hover:bg-alica_blue py-1 px-3 block truncate cursor-pointer rounded-b">
                        <i className="fa-solid fa-square-xmark mr-2 w-4 text-center text-red-600"></i>Görevi İptal Et
                      </li>
                      
                    </ul>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <nav className="flex justify-between items-center py-2 px-3 z-[1] bg-steel_blue_light h-10 bottom-0 sticky" aria-label="Table navigation">
        <span className="text-sm font-normal text-queen_blue">Toplamda <span className="font-semibold text-prussian_blue">{all_tasks.length}</span> kayıt bulunmaktadır.</span>
      </nav>
    </div>
    
  )
}
