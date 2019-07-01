'use strict'

const Alquiler = use('App/Models/Alquiler')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with alquilers
 */
class AlquilerController {
  /**
   * Show a list of all alquilers.
   * GET alquilers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {

    return view.render('alquileres.index')

  }

  /**
   * Render a form to be used for creating a new alquiler.
   * GET alquilers/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {

    return view.render('alquileres.form')
    
  }

  /**
   * Create/save a new alquiler.
   * POST alquilers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {

    const alquiler = new Alquiler()
    alquiler.date_delivery = request.input('date_delivery')
    alquiler.return_date = request.input('return_date')
    alquiler.value = request.input('value')

    await alquiler.save()

    return response.redirect('/alquileres')

    /*const alquiler = await Alquiler.create(request.only(['date_delivery' , 'return_date' , 'value']))
    return response.redirect('alquileres.index')*/

  }

  /**
   * Display a single alquiler.
   * GET alquilers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing alquiler.
   * GET alquilers/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
    const alquileres_id = await Alquiler.find(params.id)
    return view.render('alquileres.edit' , {alquileres_id})

  }

  /**
   * Update alquiler details.
   * PUT or PATCH alquilers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {

    const alquiler = await Alquiler.find(params.id)
    alquiler.date_delivery = request.input('date_delivery')
    alquiler.return_date = request.input('return_date')
    alquiler.value = request.input('value')

    await alquiler.save()

    return response.redirect('/alquileres/all')


  }

  async all ({view}){

    const alquileres = await Alquiler.all()
    //console.log(alquileres.toJSON())
    console.log(alquileres.toJSON())
    return view.render('alquileres.all' , {alquileres : alquileres.toJSON() })
  }

  async view_delete_l ({params , view }) {
    const alquileres_id = await Alquiler.find(params.id)
    return view.render('alquileres.delete' , {alquileres_id})
  }

  async delete_l ({params , request , response }){

    const alquiler = await Alquiler.find(params.id)
    alquiler.state = 0
    await alquiler.save()
    return response.redirect('/alquileres/all')
  }
  
  async view_destroy ({params , view }) {
    const alquileres_id = await Alquiler.find(params.id)
    return view.render('alquileres.destroy' , {alquileres_id})
  }
  /**
   * Delete a alquiler with id.
   * DELETE alquilers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const alquiler = await Alquiler.find(params.id)
    await alquiler.delete()
    return response.redirect('/alquileres/all')
  }
}

module.exports = AlquilerController
